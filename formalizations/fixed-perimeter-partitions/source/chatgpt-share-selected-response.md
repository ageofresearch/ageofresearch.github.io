Adam, the proof is finished.

## The conjecture

I selected **Conjecture 1.2** from Gray, Payne, Swisher, and Watson’s _Fixed perimeter analogues of some partition results_, published in _Discrete Mathematics_ in 2026.

For a partition $\pi$, define its perimeter by

$$
per ⁡ \left(\right. \pi \left.\right) = \text{largest}\textrm{ }\text{part} + \text{number}\textrm{ }\text{of}\textrm{ }\text{parts} - 1.
$$

Let:

$$
\backslash\text{FO}_{j , k} \left(\right. n \left.\right)
$$

count perimeter-$n$ partitions having exactly $j$**present part sizes divisible by $k$**, and let

$$
\backslash\text{FD}_{j , k} \left(\right. n \left.\right)
$$

count perimeter-$n$ partitions having exactly $j$**part sizes occurring at least $k$ times**.

Their conjecture states that, for every fixed $j \geq 0$ and $k \geq 2$,

$$
\backslash\text{FD}_{j , k} \left(\right. n \left.\right) \geq \backslash\text{FO}_{j , k} \left(\right. n \left.\right)
$$

for all sufficiently large $n$. The paper proves equality when $k = 2$, but leaves the general case as Conjecture 1.2. [![Image 1](https://www.google.com/s2/favicons?domain=https://arxiv.org&sz=128)arXiv+1](https://arxiv.org/pdf/2502.12394)ult

The conjecture is true. In fact:

$$
\boxed{\frac{\backslash\text{FO}_{j , k} \left(\right. n \left.\right)}{\backslash\text{FD}_{j , k} \left(\right. n \left.\right)} \rightarrow 0 \left(\right. k \geq 3 \left.\right)}
$$

for every fixed $j$.

Thus the conjectured weak inequality can be strengthened to

$$
\backslash\text{FD}_{j , k} \left(\right. n \left.\right) > \backslash\text{FO}_{j , k} \left(\right. n \left.\right)
$$

for all sufficiently large $n$ whenever $k > 2$.

For $k = 2$, the two functions remain exactly equal for every $n$, as already known.

## Core proof

Introduce the bivariate generating functions

$$
\mathcal{O}_{k} \left(\right. z , q \left.\right) = \underset{n \geq 1}{\sum} \underset{j \geq 0}{\sum} \backslash\text{FO}_{j , k} \left(\right. n \left.\right) z^{j} q^{n} ,
$$

$$
\mathcal{D}_{k} \left(\right. z , q \left.\right) = \underset{n \geq 1}{\sum} \underset{j \geq 0}{\sum} \backslash\text{FD}_{j , k} \left(\right. n \left.\right) z^{j} q^{n} .
$$

Writing a partition through its multiplicities and summing over its largest part gives the rational functions

$$
\mathcal{O}_{k} \left(\right. z , q \left.\right) = \frac{S_{k} \left(\right. q \left.\right) + z q^{k}}{P_{O} \left(\right. q \left.\right) - z q^{k + 1}} ,
$$

$$
\mathcal{D}_{k} \left(\right. z , q \left.\right) = \frac{q \left(\right. 1 - q^{k - 1} \left.\right) + z q^{k}}{P_{D} \left(\right. q \left.\right) - z q^{k + 1}} ,
$$

where

$$
S_{k} \left(\right. q \left.\right) = \sum_{r = 1}^{k - 1} q^{r} \left(\right. 1 - q \left.\right)^{k - r} ,
$$

$$
P_{O} \left(\right. q \left.\right) = \left(\right. 1 - q \left.\right)^{k} - q^{k} + q^{k + 1} , P_{D} \left(\right. q \left.\right) = 1 - 2 q + q^{k + 1} .
$$

The denominators factor as

$$
P_{D} \left(\right. q \left.\right) = \left(\right. 1 - q \left.\right) A_{D} \left(\right. q \left.\right) , A_{D} \left(\right. q \left.\right) = 1 - q - q^{2} - \hdots - q^{k} ,
$$

and

$$
P_{O} \left(\right. q \left.\right) = \left(\right. 1 - q \left.\right) A_{O} \left(\right. q \left.\right) , A_{O} \left(\right. q \left.\right) = \left(\right. 1 - q \left.\right)^{k - 1} - q^{k} .
$$

Extracting the coefficient of $z^{j}$ gives, for $j \geq 1$,

$$
\underset{n \geq 1}{\sum} \backslash\text{FD}_{j , k} \left(\right. n \left.\right) q^{n} = \frac{q^{\left(\right. k + 1 \left.\right) j - 1}}{\left(\right. 1 - q \left.\right)^{j - 1} A_{D} \left(\right. q \left.\right)^{j + 1}} ,
$$

and

$$
\underset{n \geq 1}{\sum} \backslash\text{FO}_{j , k} \left(\right. n \left.\right) q^{n} = \frac{q^{\left(\right. k + 1 \left.\right) j - 1} R_{k} \left(\right. q \left.\right)}{\left(\right. 1 - q \left.\right)^{j - 1} A_{O} \left(\right. q \left.\right)^{j + 1}} ,
$$

where

$$
R_{k} \left(\right. q \left.\right) = \left(\right. 1 - q \left.\right)^{k - 2} + \sum_{s = 2}^{k - 1} q^{s} \left(\right. 1 - q \left.\right)^{k - 1 - s} .
$$

Every term of $R_{k} \left(\right. q \left.\right)$ is positive for $0 < q < 1$.

For $j = 0$, the corresponding formulas are

$$
\underset{n \geq 1}{\sum} \backslash\text{FD}_{0 , k} \left(\right. n \left.\right) q^{n} = \frac{q \left(\right. 1 + q + \hdots + q^{k - 2} \left.\right)}{A_{D} \left(\right. q \left.\right)}
$$

and

$$
\underset{n \geq 1}{\sum} \backslash\text{FO}_{0 , k} \left(\right. n \left.\right) q^{n} = \frac{T_{k} \left(\right. q \left.\right)}{A_{O} \left(\right. q \left.\right)} ,
$$

with

$$
T_{k} \left(\right. q \left.\right) = \sum_{r = 1}^{k - 1} q^{r} \left(\right. 1 - q \left.\right)^{k - r - 1} > 0 \left(\right. 0 < q < 1 \left.\right) .
$$

Therefore the asymptotic growth is governed by the smallest-modulus zeros of $A_{D}$ and $A_{O}$.

Let their positive zeros be $\rho_{D}$ and $\rho_{O}$. Both lie in $\left(\right. 1 / 2 , 1 \left.\right)$. Each is also the unique zero of minimum modulus:

For $A_{D}$, a zero satisfies

$$
z + z^{2} + \hdots + z^{k} = 1.
$$

The triangle inequality rules out $\mid z \mid < \rho_{D}$, and equality on $\mid z \mid = \rho_{D}$ forces $z$ to be positive real.

For $A_{O}$, a zero satisfies

$$
\left(\right. 1 - z \left.\right)^{k - 1} = z^{k} .
$$

The inequality

$$
\mid 1 - z \mid \geq 1 - \mid z \mid
$$

similarly rules out $\mid z \mid < \rho_{O}$, and equality on the boundary again forces $z$ to be positive real.

The decisive comparison is

$$
\begin{aligned}
A_O(q)-A_D(q)
&=(1-q)^{k-1}-1+q+q^2+\cdots+q^{k-1} \\
&=q\sum_{\ell=0}^{k-2}\left(q^\ell-(1-q)^\ell\right).
\end{aligned}
$$

For $q > 1 / 2$ and $k \geq 3$, this quantity is strictly positive. Since $\rho_{D} > 1 / 2$,

$$
A_{O} \left(\right. \rho_{D} \left.\right) > A_{D} \left(\right. \rho_{D} \left.\right) = 0.
$$

Because $A_{O}$ is strictly decreasing on $\left(\right. 0 , 1 \left.\right)$, its zero occurs later:

$$
\boxed{\rho_{D} < \rho_{O}} .
$$

Standard rational singularity analysis now yields positive constants $C_{D} \left(\right. j , k \left.\right)$ and $C_{O} \left(\right. j , k \left.\right)$ such that

$$
\backslash\text{FD}_{j , k} \left(\right. n \left.\right) sim C_{D} \left(\right. j , k \left.\right) n^{e_{j}} \rho_{D}^{- n} ,
$$

$$
\backslash\text{FO}_{j , k} \left(\right. n \left.\right) sim C_{O} \left(\right. j , k \left.\right) n^{e_{j}} \rho_{O}^{- n} ,
$$

where $e_{0} = 0$ and $e_{j} = j$ for $j \geq 1$. Consequently,

$$
\frac{\backslash\text{FO}_{j , k} \left(\right. n \left.\right)}{\backslash\text{FD}_{j , k} \left(\right. n \left.\right)} sim \frac{C_{O} \left(\right. j , k \left.\right)}{C_{D} \left(\right. j , k \left.\right)} \left(\left(\right. \frac{\rho_{D}}{\rho_{O}} \left.\right)\right)^{n} \rightarrow 0.
$$

That proves the conjecture.

For $k = 2$,

$$
A_{D} \left(\right. q \left.\right) = A_{O} \left(\right. q \left.\right) = 1 - q - q^{2} , R_{2} \left(\right. q \left.\right) = 1 , T_{2} \left(\right. q \left.\right) = q ,
$$

so the extracted generating functions coincide exactly.

## Verification and priority

The standalone verifier directly enumerates every fixed-perimeter partition and compares the counts with the rational generating functions for

$$
2 \leq k \leq 7 , 1 \leq n \leq 15 ,
$$

and every possible $j$. Every coefficient agrees. The computation is independent support; the proof does not depend on it.

I found no public resolution through exact-title and formula searches. There is, however, a separately listed submitted manuscript titled _Generating functions and sign conjectures for fixed perimeter partitions_, with no public text available for comparison. Therefore the mathematical proof is complete, but historical priority requires confirmation from the relevant authors or referees. 
