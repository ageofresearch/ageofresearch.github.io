const KATEX_MODULE_URL =
  "./vendor/katex/katex.mjs?version=0.17.0";

export const EQUATION_PREVIEW_MACROS = Object.freeze({
  "\\FO": "\\mathrm{FO}",
  "\\FD": "\\mathrm{FD}",
});

export const EQUATION_PREVIEW_LIMITS = Object.freeze({
  maxExpressions: 1_000,
  maxExpressionCharacters: 20_000,
  maxTotalMathCharacters: 100_000,
  maxDelimiterSearchCharacters: 4_000_000,
  maxCodeSearchCharacters: 4_000_000,
});

const DISPLAY_DELIMITERS = Object.freeze([
  {
    left: "\\begin{equation*}",
    right: "\\end{equation*}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{equation}",
    right: "\\end{equation}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{alignat*}",
    right: "\\end{alignat*}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{alignat}",
    right: "\\end{alignat}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{aligned}",
    right: "\\end{aligned}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{align*}",
    right: "\\end{align*}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{align}",
    right: "\\end{align}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{gather*}",
    right: "\\end{gather*}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{gather}",
    right: "\\end{gather}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "\\begin{CD}",
    right: "\\end{CD}",
    display: true,
    includeDelimiters: true,
  },
  {
    left: "$$",
    right: "$$",
    display: true,
    includeDelimiters: false,
  },
  {
    left: "\\[",
    right: "\\]",
    display: true,
    includeDelimiters: false,
  },
  {
    left: "\\(",
    right: "\\)",
    display: false,
    includeDelimiters: false,
  },
]);

let katexModulePromise = null;

function isEscaped(source, index) {
  let slashCount = 0;
  for (let cursor = index - 1; cursor >= 0 && source[cursor] === "\\"; cursor -= 1) {
    slashCount += 1;
  }
  return slashCount % 2 === 1;
}

function characterRunLength(source, index, character) {
  let length = 0;
  while (source[index + length] === character) length += 1;
  return length;
}

function findCodeSpanEnd(
  source,
  index,
  maxSearchCharacters = Number.POSITIVE_INFINITY,
) {
  const runLength = characterRunLength(source, index, "`");
  if (!runLength) {
    return {
      end: -1,
      openingRunLength: 0,
      searchedCharacters: 0,
      searchLimitReached: false,
    };
  }

  let cursor = index + runLength;
  let searchedCharacters = runLength;
  while (cursor < source.length) {
    if (searchedCharacters >= maxSearchCharacters) {
      return {
        end: -1,
        openingRunLength: runLength,
        searchedCharacters,
        searchLimitReached: true,
      };
    }
    if (source[cursor] !== "`") {
      cursor += 1;
      searchedCharacters += 1;
      continue;
    }

    const candidateRunLength = characterRunLength(source, cursor, "`");
    searchedCharacters += candidateRunLength;
    if (candidateRunLength === runLength) {
      return {
        end: cursor + runLength,
        openingRunLength: runLength,
        searchedCharacters,
        searchLimitReached: false,
      };
    }
    cursor += candidateRunLength;
  }
  return {
    end: -1,
    openingRunLength: runLength,
    searchedCharacters,
    searchLimitReached: false,
  };
}

function findMathEnd(
  source,
  startIndex,
  delimiter,
  maxSearchCharacters = Number.POSITIVE_INFINITY,
) {
  let index = startIndex;
  let braceLevel = 0;
  let searchedCharacters = 0;

  while (index < source.length) {
    if (searchedCharacters >= maxSearchCharacters) {
      return {
        end: -1,
        searchedCharacters,
        searchLimitReached: true,
      };
    }
    if (
      braceLevel <= 0 &&
      source.startsWith(delimiter.right, index) &&
      !isEscaped(source, index)
    ) {
      if (
        delimiter.right === "$" &&
        (
          source[index - 1] === undefined ||
          /\s/u.test(source[index - 1]) ||
          source[index + 1] === "$"
        )
      ) {
        index += 1;
        searchedCharacters += 1;
        continue;
      }
      return {
        end: index,
        searchedCharacters,
        searchLimitReached: false,
      };
    }

    const character = source[index];
    if (character === "\\") {
      index += 2;
      searchedCharacters += 2;
      continue;
    }
    if (character === "{") braceLevel += 1;
    if (character === "}") braceLevel -= 1;
    index += 1;
    searchedCharacters += 1;
  }
  return {
    end: -1,
    searchedCharacters,
    searchLimitReached: false,
  };
}

function getOpeningDelimiter(source, index) {
  for (const delimiter of DISPLAY_DELIMITERS) {
    if (
      source.startsWith(delimiter.left, index) &&
      !isEscaped(source, index)
    ) {
      return delimiter;
    }
  }

  if (
    source[index] === "$" &&
    source[index + 1] !== "$" &&
    !isEscaped(source, index) &&
    source[index + 1] !== undefined &&
    !/\s/u.test(source[index + 1])
  ) {
    return {
      left: "$",
      right: "$",
      display: false,
      includeDelimiters: false,
    };
  }
  return null;
}

function pushTextToken(tokens, value) {
  if (!value) return;
  const previous = tokens.at(-1);
  if (previous?.type === "text") {
    previous.value += value;
    previous.raw += value;
    return;
  }
  tokens.push({ type: "text", value, raw: value });
}

function tokenizeEquationPreviewInternal(value, limits = null) {
  const source = String(value ?? "");
  const tokens = [];
  let textStart = 0;
  let index = 0;
  let expressionCount = 0;
  let totalMathCharacters = 0;
  let limited = false;
  let oversizedExpressionCount = 0;
  let remainingDelimiterSearchCharacters =
    limits?.maxDelimiterSearchCharacters ??
    Number.POSITIVE_INFINITY;
  let remainingCodeSearchCharacters =
    limits?.maxCodeSearchCharacters ??
    Number.POSITIVE_INFINITY;

  while (index < source.length) {
    if (source[index] === "`" && !isEscaped(source, index)) {
      const codeSpan = findCodeSpanEnd(
        source,
        index,
        remainingCodeSearchCharacters,
      );
      remainingCodeSearchCharacters -= codeSpan.searchedCharacters;
      if (codeSpan.end > index) {
        index = codeSpan.end;
        continue;
      }
      if (codeSpan.searchLimitReached) {
        limited = true;
        break;
      }
      index += Math.max(1, codeSpan.openingRunLength);
      continue;
    }

    const delimiter = getOpeningDelimiter(source, index);
    if (!delimiter) {
      index += 1;
      continue;
    }

    const contentStart = index + delimiter.left.length;
    const mathEnd = findMathEnd(
      source,
      contentStart,
      delimiter,
      remainingDelimiterSearchCharacters,
    );
    remainingDelimiterSearchCharacters -= mathEnd.searchedCharacters;
    const contentEnd = mathEnd.end;
    if (contentEnd < 0) {
      if (mathEnd.searchLimitReached) {
        limited = true;
        break;
      }
      index += delimiter.left.length;
      continue;
    }

    const end = contentEnd + delimiter.right.length;
    const contentLength = contentEnd - contentStart;
    if (
      limits &&
      contentLength > limits.maxExpressionCharacters
    ) {
      oversizedExpressionCount += 1;
      limited = true;
      index = end;
      continue;
    }
    if (
      limits &&
      (
        expressionCount >= limits.maxExpressions ||
        totalMathCharacters + contentLength >
          limits.maxTotalMathCharacters
      )
    ) {
      limited = true;
      break;
    }

    const content = source.slice(contentStart, contentEnd);
    if (
      !content ||
      (
        delimiter.left === "$" &&
        (content.includes("\n\n") || /\s$/u.test(content))
      )
    ) {
      index += delimiter.left.length;
      continue;
    }

    pushTextToken(tokens, source.slice(textStart, index));
    const raw = source.slice(index, end);
    tokens.push({
      type: "math",
      value: delimiter.includeDelimiters ? raw : content,
      raw,
      display: delimiter.display,
    });
    expressionCount += 1;
    totalMathCharacters += contentLength;
    index = end;
    textStart = end;
  }

  pushTextToken(tokens, source.slice(textStart));
  return {
    tokens,
    limited,
    oversizedExpressionCount,
    expressionCount,
    totalMathCharacters,
  };
}

export function tokenizeEquationPreview(value) {
  return tokenizeEquationPreviewInternal(value).tokens;
}

export function createEquationPreviewRenderPlan(value) {
  return tokenizeEquationPreviewInternal(value, EQUATION_PREVIEW_LIMITS);
}

export function reconstructEquationPreviewSource(tokens) {
  if (!Array.isArray(tokens)) return "";
  return tokens
    .map((token) => (typeof token?.raw === "string" ? token.raw : ""))
    .join("");
}

async function loadKatex() {
  if (!katexModulePromise) {
    katexModulePromise = import(KATEX_MODULE_URL)
      .then((module) => {
        if (!module?.default || typeof module.default.render !== "function") {
          throw new Error("The local equation renderer is unavailable.");
        }
        return module.default;
      })
      .catch((error) => {
        katexModulePromise = null;
        throw error;
      });
  }
  return katexModulePromise;
}

async function yieldToBrowser(document) {
  const view = document.defaultView;
  if (typeof view?.requestAnimationFrame === "function") {
    await new Promise((resolve) => view.requestAnimationFrame(resolve));
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, 0));
}

export async function renderEquationPreview(container, source) {
  if (
    !container ||
    typeof container.replaceChildren !== "function" ||
    !container.ownerDocument
  ) {
    throw new TypeError("A preview container is required.");
  }

  const katex = await loadKatex();
  const document = container.ownerDocument;
  const fragment = document.createDocumentFragment();
  const plan = createEquationPreviewRenderPlan(source);
  let renderedCount = 0;
  let failedCount = 0;
  let attemptedCount = 0;

  for (const token of plan.tokens) {
    if (token.type === "text") {
      fragment.append(document.createTextNode(token.value));
      continue;
    }

    const equation = document.createElement(token.display ? "div" : "span");
    equation.className = token.display
      ? "equation-preview-math equation-preview-math-display"
      : "equation-preview-math equation-preview-math-inline";
    try {
      katex.render(token.value, equation, {
        displayMode: token.display,
        output: "htmlAndMathml",
        throwOnError: true,
        strict: "ignore",
        trust: false,
        maxExpand: 1_000,
        maxSize: 100,
        macros: { ...EQUATION_PREVIEW_MACROS },
      });
      fragment.append(equation);
      renderedCount += 1;
    } catch {
      fragment.append(document.createTextNode(token.raw));
      failedCount += 1;
    }
    attemptedCount += 1;
    if (attemptedCount % 25 === 0) {
      await yieldToBrowser(document);
    }
  }

  container.replaceChildren(fragment);
  return {
    renderedCount,
    failedCount,
    limited: plan.limited,
    oversizedExpressionCount: plan.oversizedExpressionCount,
  };
}
