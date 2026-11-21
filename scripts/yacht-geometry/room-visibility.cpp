#include <algorithm>
#include <array>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <fstream>
#include <iostream>
#include <map>
#include <stdexcept>
#include <string>

#include <unordered_set>
#include <vector>
using namespace std;
struct PackedVertex {
  float pos[3];
  uint8_t rest[16];
  int16_t layer, other;
};
struct Point {
  double x, y, z;
  Point operator-(Point b) const { return {x - b.x, y - b.y, z - b.z}; }
  Point operator+(Point b) const { return {x + b.x, y + b.y, z + b.z}; }
  Point operator*(double scale) const {
    return {x * scale, y * scale, z * scale};
  }
};
Point cross(Point a, Point b) {
  return {a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x};
}
double dot(Point a, Point b) { return a.x * b.x + a.y * b.y + a.z * b.z; }
double len(Point a) { return sqrt(dot(a, a)); }
struct Blocker {
  int pointIDs[3], neighbor[3];
  Point corner[3], normal;
  double normalLength, level;
};
constexpr int binCount = 60;
const double gridExtent = 1.6;
int bin(double s) {
  return clamp(int((s + gridExtent) / (2 * gridExtent) * binCount), 0,
               binCount - 1);
}
// Build one CPU-authored mask. The right-handed yacht coordinates become a
// left-handed beam space with positive forward depth. The projection is used
// only to select candidate blockers. It never certifies an invisible face.
vector<uint8_t> bakeCell(const vector<PackedVertex> &vertices,
                         const vector<uint32_t> &indices, double radius,
                         double sign, Point eye, Point halfExtent) {
  // The deck floor cells are much shallower vertically than horizontally.
  // The maximum of a linear form over the box occurs at a corner. Keep the
  // same radial padding as the enclosing sphere for numerical safety.
  const bool useBox = halfExtent.x > 0;
  auto eyeSupport = [&](Point n) {
    if (!useBox) return radius * len(n);
    return abs(n.x) * halfExtent.x + abs(n.y) * halfExtent.y +
           abs(n.z) * halfExtent.z + .025 * len(n);
  };
  constexpr double nearReach = .065, angularMargin = .002;
  const int n = vertices.size(), k = indices.size();
  vector<Point> points;
  map<array<float, 3>, int> welded;
  vector<int> pointIndex(n);
  for (int i = 0; i < n; i++) {
    auto a = vertices[i].pos;
    auto it =
        welded.emplace(array<float, 3>{a[0], a[1], a[2]}, int(points.size()));
    pointIndex[i] = it.first->second;
    if (it.second) {
      points.push_back(
          {-sign * (a[0] - eye.x), a[1] - eye.y, sign * (a[2] - eye.z)});
    }
  }
  vector<Blocker> blockers;
  int total = k / 3;
  vector<int> ownBlocker(total, -1), bins[binCount * binCount];
  map<pair<int, int>, vector<pair<int, int>>> edges;
  for (int i = 0; i < total; i++) {
    Blocker t{};
    for (int j = 0; j < 3; j++) {
      t.pointIDs[j] = pointIndex[indices[3 * i + j]];
      t.corner[j] = points[t.pointIDs[j]];
      t.neighbor[j] = -1;
    }
    t.normal = cross(t.corner[1] - t.corner[0], t.corner[2] - t.corner[0]);
    t.normalLength = len(t.normal);
    t.level = dot(t.normal, t.corner[0]);
    if (vertices[indices[3 * i]].layer == -2 || t.normalLength < 1e-9 ||
        t.level < eyeSupport(t.normal) + (nearReach + .003) * t.normalLength)
      continue;
    int s = blockers.size();
    ownBlocker[i] = s;
    blockers.push_back(t);
    for (int j = 0; j < 3; j++) {
      int a = t.pointIDs[j], b = t.pointIDs[(j + 1) % 3];
      edges[minmax(a, b)].push_back({s, j});
    }
    int x0 = 0, y0 = 0, x1 = binCount - 1, y1 = binCount - 1;
    if (min({t.corner[0].z, t.corner[1].z, t.corner[2].z}) > .005) {
      x0 = y0 = binCount - 1;
      x1 = y1 = 0;
      for (auto corner : t.corner) {
        x0 = min(x0, bin(corner.x / corner.z));
        x1 = max(x1, bin(corner.x / corner.z));
        y0 = min(y0, bin(corner.y / corner.z));
        y1 = max(y1, bin(corner.y / corner.z));
      }
    }
    for (int y = y0; y <= y1; y++)
      for (int x = x0; x <= x1; x++)
        bins[y * binCount + x].push_back(s);
  }
  // Crossing a welded edge preserves coverage only for opposite orientations.
  // Open, branching and back-facing continuations cannot close a ray beam.
  for (auto &[e, uses] : edges)
    if (uses.size() == 2) {
      auto [a, i] = uses[0];
      auto [b, j] = uses[1];
      if (blockers[a].pointIDs[i] != blockers[b].pointIDs[j]) {
        blockers[a].neighbor[i] = b;
        blockers[b].neighbor[j] = a;
      }
    }
  vector<int> seen(blockers.size());
  int visit = 0;
  auto covered = [&](array<Point, 3> target, int selfFace) {
    Point centre = (target[0] + target[1] + target[2]) * (1. / 3);
    if (min({target[0].z, target[1].z, target[2].z}) <
            nearReach + radius + .01 ||
        abs(centre.x / centre.z) > gridExtent ||
        abs(centre.y / centre.z) > gridExtent)
      return false;
    double reach =
               max({len(target[0]), len(target[1]), len(target[2])}) + radius,
           eyeGuard = radius + .001;
    Point nn = cross(target[1] - target[0], target[2] - target[0]);
    double normalLength = len(nn),
           planeDistance =
               normalLength > 0
                   ? (fabs(dot(nn, target[0])) - eyeSupport(nn)) / normalLength
                   : 0;
    if (planeDistance < reach * .002 + .003)
      return false;
    double edgeGuard = .003 + angularMargin * reach;
    // At grazing angles a subpixel change corresponds to a larger change in
    // depth. Leave uncertain receivers and near-coplanar fittings to the GPU.
    double depthGuard = .03 + .0005 * reach * reach / planeDistance;
    double longest =
        max({len(target[0] - target[1]), len(target[1] - target[2]),
             len(target[2] - target[0])});
    if (planeDistance * normalLength < longest * reach * reach * .000045)
      return false;
    // det(a-eye,b-eye,target-eye) is affine in eye. Its maximum change on
    // the eye cell is the support in direction (b-a) cross (target-a). Keep a
    // separate edge guard for fixed-point rasterization.
    auto stable = [&](Point a, Point b, Point t) {
      Point n = cross(a, b), drift = cross(b - a, t - a);
      double d = dot(n, t),
             margin = eyeSupport(drift) + .001 * len(drift) +
                      edgeGuard * (len(n) + eyeGuard * len(b - a));
      return d > margin ? 1 : d < -margin ? -1 : 0;
    };
    // A separating projected edge rules out an intersection with the entire
    // beam. Otherwise follow its neighbor, including uncertain near-plane
    // edges.
    auto mayCross = [&](Point a, Point b) {
      if (min(a.z, b.z) >
          max({target[0].z, target[1].z, target[2].z}) + edgeGuard)
        return false;
      if (min(a.z, b.z) <= radius + nearReach)
        return true;
      int side = stable(a, b, target[0]);
      if (side && side == stable(a, b, target[1]) &&
          side == stable(a, b, target[2]))
        return false;
      for (int j = 0; j < 3; j++) {
        Point aTarget = target[j], bTarget = target[(j + 1) % 3];
        int opp = stable(aTarget, bTarget, target[(j + 2) % 3]);
        if (opp && stable(aTarget, bTarget, a) == -opp &&
            stable(aTarget, bTarget, b) == -opp)
          return false;
      }
      return true;
    };
    auto ahead = [&](Blocker const &t) {
      for (auto corner : target)
        if (dot(t.normal, corner) <=
            t.level + (depthGuard + .0005 * reach * reach /
                                        ((t.level - eyeSupport(t.normal)) / t.normalLength)) *
                          t.normalLength)
          return false;
      return true;
    };
    ++visit;
    for (auto seed :
         bins[bin(centre.y / centre.z) * binCount + bin(centre.x / centre.z)]) {
      if (seed == selfFace || seen[seed] == visit)
        continue;
      Blocker const &t = blockers[seed];
      if (dot(t.normal, centre) <= t.level ||
          dot(cross(t.corner[0], t.corner[1]), centre) <= 0 ||
          dot(cross(t.corner[1], t.corner[2]), centre) <= 0 ||
          dot(cross(t.corner[2], t.corner[0]), centre) <= 0 || !ahead(t))
        continue;
      // The centre ray hits this opaque face. Across the connected family of
      // eye-to-target segments, that hit can escape only through a boundary
      // edge or through the target. Visit every such edge and require all
      // traversed faces to stay strictly ahead of the target.
      vector<int> stack{seed};
      seen[seed] = visit;
      unordered_set<int> component{seed};
      bool closed = true;
      while (stack.size() && closed) {
        int u = stack.back();
        stack.pop_back();
        auto &face = blockers[u];
        for (int j = 0; j < 3; j++) {
          auto neighbor = face.neighbor[j];
          if (component.count(neighbor))
            continue;
          if (!mayCross(face.corner[j], face.corner[(j + 1) % 3]))
            continue;
          if (neighbor < 0 || neighbor == selfFace ||
              !ahead(blockers[neighbor]) || component.size() > 150) {
            closed = false;
            break;
          }
          component.insert(neighbor);
          seen[neighbor] = visit;
          stack.push_back(neighbor);
        }
      }
      if (closed)
        return true;
    }
    return false;
  };
  auto hidden = [&](auto &&self, array<Point, 3> target, int selfFace,
                    int depth) -> bool {
    if (covered(target, selfFace))
      return true;
    if (!depth)
      return false;
    Point a = target[0], b = target[1], c = target[2], ab = (a + b) * .5,
          bc = (b + c) * .5, ca = (c + a) * .5;
    return self(self, {a, ab, ca}, selfFace, depth - 1) &&
           self(self, {b, bc, ab}, selfFace, depth - 1) &&
           self(self, {c, ca, bc}, selfFace, depth - 1) &&
           self(self, {ab, bc, ca}, selfFace, depth - 1);
  };
  vector<uint8_t> bits((total + 7) / 8);
  for (int i = 0; i < total; i++) {
    array<Point, 3> t = {points[pointIndex[indices[3 * i]]],
                         points[pointIndex[indices[3 * i + 1]]],
                         points[pointIndex[indices[3 * i + 2]]]};
    bool occluded = vertices[indices[3 * i]].layer != -2 &&
                    hidden(hidden, t, ownBlocker[i], 2);
    if (occluded)
      bits[i >> 3] |= 1 << (i & 7);
  }
  return bits;
}

// Used by build-room-visibility.mjs on a little-endian build host. Each input
// is generated from the same packed vertex buffer and sightline index prefix
// that the browser will hash before accepting the result.
int main(int argc, char **argv) {
  try {
    if (argc != 8 && argc != 11)
      throw runtime_error(
          "Expected mesh, radius, sign, eye X/Y/Z, output path and optional cell half extents");
    ifstream input(argv[1], ios::binary);
    input.exceptions(ios::failbit | ios::badbit);
    uint32_t counts[2];
    input.read(reinterpret_cast<char *>(counts), sizeof(counts));
    if (!counts[0] || counts[0] > 1000000 || !counts[1] ||
        counts[1] > 3000000 || counts[1] % 3)
      throw runtime_error("Invalid yacht geometry counts");
    static_assert(sizeof(PackedVertex) == 32);
    vector<PackedVertex> vertices(counts[0]);
    vector<uint32_t> indices(counts[1]);
    input.read(reinterpret_cast<char *>(vertices.data()),
               vertices.size() * sizeof(PackedVertex));
    input.read(reinterpret_cast<char *>(indices.data()),
               indices.size() * sizeof(uint32_t));
    if (*max_element(indices.begin(), indices.end()) >= vertices.size())
      throw runtime_error("Invalid yacht vertex index");
    Point halfExtent{};
    if (argc == 11) halfExtent = {stod(argv[8]), stod(argv[9]), stod(argv[10])};
    auto bits = bakeCell(vertices, indices, stod(argv[2]), stod(argv[3]),
                         {stod(argv[4]), stod(argv[5]), stod(argv[6])}, halfExtent);
    ofstream output(argv[7], ios::binary);
    output.exceptions(ios::failbit | ios::badbit);
    output.write(reinterpret_cast<char *>(bits.data()), bits.size());
    output.close();
  } catch (const exception &e) {
    cerr << e.what() << '\n';
    return 1;
  }
}
