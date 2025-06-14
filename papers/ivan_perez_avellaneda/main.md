---
# Ensure that this title is the same as the one in `myst.yml`
title: 'Paper: SciPy Optimize and Reachability of Nonlinear Systems'
#'CFSpy: A Python Library for the Computation of Chen-Fliess Series'
abstract: |
  In this paper, CFSpy a package in Python that numerically computes Chen-Fliess series
  is presented. The reachable sets of non-linear systems are
  calculated with this package. The method used obtains batches of iterative integrals
  of the same length instead one at a time. For this, we consider the alphabetical
  order of the words that index the series. By redefining the iterative
  integral reading the index word in the opposite direction from right
  to left, we allow the broadcasting of the computation of the iterative
  integral to all permutations of a length. Assuming the input
  is sufficiently well approximated by piece-wise step functions in 
  a fine-enough partition of the time interval, the minimum boundary box (MBB) of a 
  rechable set is computed by means of polynomials. To solve the optimization problem,
  the SciPy library is used.

---

## Introduction

Control systems describe the dynamics of many of the mechanisms in the engineering field. 
In [@Qasem2024] the inverted pendulum is described as control system taking ... as the inputs
and in [@He2024], the planar vertical take-off and landing (PVTOL) which describes
a simplified unmanned aircraft vehicle (UAV) model is used to analyze the reachability of
the system.

A Chen-Fliess series provides a local representation of the output of 
a non-linear control-affine system in terms of its input. 
Given its coefficients, the series overlooks the dynamics when computing the output. 
This is important in cases where the system is unknown or 
affected by uncertainty.

A Python library for the computation of Chen-Fliess series is introduced
and it is used to perform reachability analysis of non-linear system by
assuming the input functions can be piece-wise approximated. A polynomial
of the Chen-Fliess series is obtained and then optimized to get the
points of an overstimation of the reachable set.



## Preliminaries

In the current section,  we give the definitions and results used to explain
our main contribution: the algorithms to compute Chen-Fliess series and how these
are used to analyze the reachability of control-affine non-linear systems. For this, in [](#sec_language), concepts from formal language
theory are presented to characterize Chen-Fliess series which are defined in [](#sec_CFS). These provide a
representation of the output of a nonlinear-affine systems in terms of iterated integrals
of the input. Then, in [](#sec_matrixop), to explain better the algorithm, we use tools from linear algebra and matrix operations.

(sec_matrixop)=
### Matrix Operations

As we will see in [](#sec_results), to avoid computing the components of the Chen-Fliess series
one by one, this is, permutation by permutation, matrix operations such as the Kronecker product
to represent the stacking of two matrices and the elementwise multiplication or Hadamard product
 are defined. 

:::{prf:definition} Kronecker Product
:label: def_kronecker

Given the matrix $A_{m,n}$ and $B_{p,q}$, the Kronecker product $A\otimes B$ is defined by

$$
A\otimes B = 
\begin{bmatrix}
  a_{11}B & \cdots & a_{1n}B\\
  \vdots & \ddots & \vdots\\
  a_{m1}B & \cdots & a_{mn} B
\end{bmatrix}
$$
:::

In particular, stacking a matrix $B$ vertically $k$ times is written in terms of this product and the unitary 
vector as follows

:::{prf:example}
:label: ex_kronecker
Denote $\mathbb{1}_k$ the vector of $k$ ones and take the arbitrary matrix $B$, then


```{math}
:label: 
\mathbb{1}_{k}\otimes B = 
\begin{bmatrix}
B \\
\vdots \\
B
\end{bmatrix}
```
:::



The next operation is useful to perfom the iterative integration
of the inputs represented as matrices.

:::{prf:definition} Hadamard Product
:label: def_hadamard

Given the matrix $A_{m,n}$ and $B_{m,n}$, the Hadamard product is defined by

$$
(A\odot B)_{ij} = (A)_{ij}(B)_{ij}
$$
:::


:::{prf:example}
:label: ex_hadamard
Consider the matrices $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$ 
and $B = \begin{bmatrix} 7 & 8 & 9 \\ 10 & 11 & 12 \end{bmatrix}$. 
The Hadamard product $A \odot B$ is the following

```{math}
:label:
A\odot B = 
\begin{bmatrix}
7 & 16 & 27 \\
40  & 55 & 72
\end{bmatrix}
```
:::

The next operation characterizes the vertical stacking of two 
different matrices.

:::{prf:definition} Vertical Direct Sum
:label: def_directsum

Given the matrix $A_{m,n}$ and $B_{r,n}$, the vertical direct sum is defined by

$$
A\oplus_v B = 
\begin{bmatrix}
A\\
B
\end{bmatrix}
$$
:::


:::{prf:example}
:label: ex_vertical_stack
Consider the matrices $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$ 
and $B = \begin{bmatrix} 7 & 8 & 9 \\ 10 & 11 & 12 \\ 13 & 14 & 15 \end{bmatrix}$. 
The vertical direct sum $A \oplus_{v} B$ is the following

```{math}
:label:
A\oplus_{v} B = 
\begin{bmatrix}
1 & 2 & 3 \\
4  & 5 & 6 \\
7 & 8 & 9 \\
10 & 11 & 12 \\
13 & 14 & 15 \\
\end{bmatrix}
```
:::

(sec_language)= 
### Formal Language Theory

:::{prf:definition} Monoid
:label: def_monoid

The tuple $(S, \cdot, e)$ is a *monoid* if
the operation $\cdot: S\times S \rightarrow S$ satisfies the associativity property
and $e$ is the identity element under $S$.
:::

To make notation concise, given the monoid $(S,\cdot)$, we write $\cdot(s_1, s_2)$ as
the concatenation $s_1 s_2$
then by the associativity $(s_1 s_2) s_3 = s_1 (s_2 s_3) = s_1 s_2 s_3$. Thus,
the operation $\cdot: S\times S \rightarrow S$ is referred to as *concatenation*.
The concatenation of finite number of elements of $S$ is called a *word*. 


A *free monoid* $(X^*, \cdot, \empty)$ generated 
by the set $X$ is the monoid of all finite concatenations of the elements of $X.$
 The generating set $X$ is called *alphabet* and its elements
 *letters*. Next, we define a function that helps us classify words and
define the algorithms in [](#sec_results).

:::{prf:definition} Length of a Word
:label: def_length

Given the free monoid $(X^*, \cdot, \empty)$ with alphabet $X = \{x_0, \cdots, x_m\}$,
the *length* of a word is the function $|\cdot |: X^* \rightarrow \mathbb{N}$ such that 
for an arbitrary word $x_{i_1}\cdots x_{i_n} \in X^*$, it assigns
$$
|x_{i_1}\cdots x_{i_n}| = n
$$
:::

The set of all words of length $k$ is written as $X^k$. Then, we can express $X^* = \cup_{k=0}^{\infty}X^k$.
Next, we define the set of formal power series over $\mathbb{R}$ with indeterminates in $X^*$.

:::{prf:definition} Formal Power Series
:label: def_freealg

A *formal power series* $c$ with indeterminates in $X^*$ and coefficients $(c,\eta) \in \mathbb{R}^\ell$
has the form:

```{math}
c := \sum_{\eta \in X^*} (c,\eta) \eta
```

:::

The set of all power series $c$ is denoted $\mathbb{R}^\ell\langle \langle X\rangle \rangle$ and is extended to
an *algebra* structure by adding the the *shuffle* operator.


(sec_CFS)=
### Chen-Fliess Series

:::{prf:definition}
:label: def_iterint

Given the free monoid $(X^*, \cdot,\empty)$, and the word $\xi = x_{i}\eta \in X^*$, the *iterative integral*
of $u\in L^m[0, T]$ associated to $\xi$ is the function $E_{\xi}:L^m[0, T]\rightarrow C[0,T]$, described
recursively by

$$
\begin{align*}
E_{\empty}[u](t) = 1
\end{align*}
$$

$$
\begin{align*}
E_{x_{i}\eta}[u](t) = \int_{0}^{t}u_{x_{i}}(\tau)E_{\eta}[u](\tau)d\tau
\end{align*}
$$
:::

This definition is naturally extended to power series

:::{prf:definition}
:label: def_cfs

Given the free monoid $(X^*, \cdot,\empty)$, and the formal power series $c\in \mathbb{R}^\ell\langle\langle X\rangle\rangle$, the *Chen-Fliess series* associated to $c$ is the functional, $F_{c}[\cdot](t):L^p[0, T]\rightarrow \mathbb{R}^\ell$, described by

$$
\begin{align*}
F_c[u](t) = \sum_{\eta \in X^*} (c, \eta) E_{\eta}[u](t)
\end{align*}
$$
:::


A control-affine non-linear system refers to the following differential equation:
$$
\label{nonlinsys}
\dot{z} &= g_0(z) + \sum_{i = 1}^{m} g_i(z) u_i\\
y &= h(z)
$$


:::{prf:definition}
:label: def_liederiv

The Lie derivative of $h$ associated to the word $\eta \in X^*$ is the following:

$$
\begin{align*}
L_{\eta}h = L_{x_{i_1}}\cdots L_{x_{i_k}}h
\end{align*}
$$
:::

Input-output representation of a non-linear system.

:::{prf:theorem} Fliess, 1983
:label: th_nonlsys_rep

Consider the system in [](#nonlinsys). 
The Chen-Fliess series $F_c$ represents the system
if and only if

* The coefficient of the Fliess operator satisfies: $(c,\eta) = L_{\eta}h(z)|_{z_0}$ for $\eta\in X^*$.
* The power series $c$ has finite Lie rank.
* There exist $K, M\geq 0$ such that $|(c,\eta)|\leq KM^{|\eta|}|\eta|!$

:::


(sec_results)=
## Main Results

In the current section, the numerical computation of the Chen-Fliess series is addressed.
For this, the iterative integral and the Lie derivative are redefined to allow for
easier algorithm implementations. In [](#sec_CFS), they are written recursively.  In this section, we changed
the direction of the expressions to compute them iteratively. 
Instead of looking at the definition of the components forwardly, 
they are rewritten backwardly. 

Another aspect of the numerical computation that we describe is how to avoid calculating 
each component of the Chen-Fliess series word by word. For this, the new definitions are
broadcasted to generate batches of a fixed length that will be stacked and multiplied
componentwise to obtain the final output. This increases the speed of the algorithms.



(sec_broadcasting)=
### Broadcasting


Consider the partition $\mathcal{P} = \lbrace t_0, \cdots, t_R\rbrace$ of the time interval $[0, T]$ 
and the input vector function $u = (u_0, \cdots, u_m) \in L^{m+1}_p[0,T]$. To avoid computing each iterative integral
one word at the time and, instead, obtain the batch of all words of a fixed length, we need to consider
the alphabetical order of the words. First, broadcast the integration of the input function 

```{math}
\int u = \left(\int u_0, \cdots, \int u_m\right),
```
then broadcast the multiplication by the first component $u_0$ and 
integrate, this is, 
```{math}
\int u_0\int u = \left(\int u_0\int u_0, \cdots, \int u_0\int u_m\right).
```
Repeat the process 
for each of the components and stack the result, we obtain the array 
```{math}
:label: eq_block_ethree
\int u\int u = \left[\int u_i\int u_0 \cdots \int u_i\int u_m\right]_{i\in \lbrace 1, \cdots, m\rbrace}.
```
Notice that $\int u \int u$ is the array
of iterated integral $E_{\eta}[u]$ of words $\eta$ of length two. Inductively, given the array of iterated integrals 
of all words in $X^k$ and denote it 

```{math}
\left(\int u\right)^k
```
we construct the array of iterated integral of words in $X^{k+1}$ by broadcasting the multiplication of
each component $u_i$ and the integration. This is,

```{math}
\left(\int u\right)^{k+1} = \left[ \int u_i\odot\left(\int u\right)^k\right]_{i\in \lbrace 1, \cdots, m\rbrace}
```

Numerically, the following steps are followed. Take the matrix of the partitioned input functions

```{math}
\begin{bmatrix}
u_0(t_0) & \cdots & u_0(t_{R})\\
\vdots & \ddots & \vdots\\
u_m(t_0) & \cdots & u_m(t_{R})
\end{bmatrix}

```
integrate by taking the cummulative each component of the matrix and multiplying
by a given rectangle size $\Delta$


```{math}
\begin{bmatrix}
\sum_{i = -1}^{0} u_0(t_i) & \cdots & \sum_{i = -1}^{R} u_0(t_i)\\
\vdots & \ddots & \vdots\\
\sum_{i = -1}^{0} u_m(t_i) & \cdots & \sum_{i = -1}^{R} u_m(t_i)
\end{bmatrix}
\Delta
```
broadcast the multiplication of the first component $u_0$
```{math}
\begin{bmatrix}
u_0(t_0) & \cdots & u_0(t_R)\\
\vdots & \ddots & \vdots\\
u_0(t_0) & \cdots & u_0(t_R)
\end{bmatrix}_{(m,\ T+1)}
\odot
\begin{bmatrix}
\sum_{i = -1}^{0} u_0(t_i) & \cdots & \sum_{i = -1}^{R} u_0(t_i)\\
\vdots & \ddots & \vdots\\
\sum_{i = -1}^{0} u_m(t_i) & \cdots & \sum_{i = -1}^{R} u_m(t_i)
\end{bmatrix}
\Delta
```
repeat for each component of the input and stack them as in equation [](#eq_block_ethree)
to obtain numerically the list of $E_{\eta}[u]$ for $\eta\in X^3$

```{math}
\begin{bmatrix}
\sum_{k=-1}^0 u_0(t_k)\left(\sum_{i = -1}^{k} u_0(t_i)\right)\Delta & \cdots & \sum_{k = -1}^R u_0(t_k)\left(\sum_{i = -1}^{k} u_0(t_i)\right)\Delta\\
\vdots & \ddots & \vdots\\
\sum_{k=-1}^0 u_0(t_k)\left(\sum_{i = -1}^{k} u_m(t_i)\right)\Delta & \cdots & \sum_{k = -1}^R u_0(t_k)\left(\sum_{i = -1}^{k} u_m(t_i)\right)\Delta\\
\\
\hdashline\\
& \vdots\\
\\
\hdashline
\\
\sum_{k=-1}^0 u_m(t_k)\left(\sum_{i = -1}^{k} u_0(t_i)\right)\Delta & \cdots & \sum_{k = -1}^R u_m(t_k)\left(\sum_{i = -1}^{k} u_0(t_i)\right)\Delta\\
\vdots & \ddots & \vdots\\
\sum_{k=-1}^0 u_m(t_k)\left(\sum_{i = -1}^{k} u_m(t_i)\right)\Delta & \cdots & \sum_{k = -1}^R u_m(t_k)\left(\sum_{i = -1}^{k} u_m(t_i)\right)\Delta\\
\end{bmatrix}
\Delta
```


(sec_compiterint)=
### Computation of Iterated Integrals

:::{prf:definition}
:label: def_newiterint

Consider the word $\eta = x_{i_1}\cdots x_{i_{r}} \in X^*$, the *backward* iterative integral
of $u\in L^p[0, T]$ associated to $\eta$ is the operator $H_{\eta}(\cdot)$ described
recursively by

```{math}
H_{x_{i_1}}(H_{x_{i_2}}(\cdots H_{x_{i_r}}))
```
where 

```{math}
H_{x_{i_j}}(\cdot) =  
  \begin{cases}
   \quad \displaystyle\int u_{i_j} &\text{if } j = r, \\
   \quad \displaystyle\int (\cdot) &\text{if } j = 0, \\
   u_{i_j}\displaystyle\int(\cdot ) &\text{otherwise. } 
  \end{cases}

```
:::


The following algorithm provides the matrix of the stacked iterative integrals:

:::{prf:algorithm} 
:label: matrix_iter_int

**Inputs** Given the truncation length $N$, the inputs $u$ of the system in [](#nonlinsys)   

**Output** The matrix $\mathcal{U}$ of the stacking of iterative integrals $E_\eta[u](t)$ for $|\eta|\leq N$

$U_0 \leftarrow 1 \oplus_v u$

$U_1 \leftarrow [\textbf{0}\ |\ S(U_0)_{:,\hat{T}}\Delta]$

$\mathcal{U} \leftarrow U_1$

For $k$ in $\{1,\cdots, N-1\}$ do:
>    1. $V \leftarrow \textbf{1}_{m} \otimes U_k$ 
>    2. $v \leftarrow [I_{m}\otimes \textbf{1}_{N_{U_{k}}}] u$ 
>    3. $M \leftarrow v\odot V$
>    4. $U_{k+1} \leftarrow [\textbf{0}\ |\ S(M)_{:,\hat{T}}\Delta]$
>    5. $\mathcal{U} \leftarrow U_k \oplus_{v} \mathcal{U}$
:::


(sec_complie)=
### Computation of Lie Derivatives

We need to see the previous definition iteratively as follows
:::{prf:definition}
:label: def_newliederiv

Given the free monoid $(X^*, \cdot,\empty)$, and the word $\xi = x_{i}\eta \in X^*$, the *iterative integral*
of $u\in L^p[0, T]$ associated to $\xi$ is the function $E[u]_{\xi}(\cdot):\mathbb{R}\rightarrow \mathbb{R}$, described
recursively by

$$
\begin{align*}
L_{\empty}(h) = h
\end{align*}
$$

$$
\begin{align*}
L_{\eta x_{i_j}}h = L_{\eta}(L_{x_{i_j}}h)
\end{align*}
$$
:::




The following algorithm provides the list of the stacked Lie derivatives:

:::{prf:algorithm} 
:label: matrix_lie_deriv

**Inputs** Given the truncation length $N$, the inputs $u$ of the system in [](#nonlinsys)   

**Output** The matrix $\mathcal{G}$ of the stacking of Lie derivatives $L_{\eta}h(x) $ for $|\eta|\leq N$

$G_0 \leftarrow \textbf{1}_{m} \otimes h$

$G_1 \leftarrow \frac{\partial}{\partial x} G_0\cdot g$

$\mathcal{G} \leftarrow G_1$


For $k$ in $\{1,\cdots, N-1\}$ do:
>    1. $V \leftarrow \textbf{1}_{m} \otimes  \frac{\partial}{\partial x}G_k$ 
>    2. $v \leftarrow [I_{m}\otimes \textbf{1}_{N_{G_{k}}}] g$ 
>    3. $M \leftarrow V\cdot v$
>    4. $G_{k+1} \leftarrow M $
>    5. $\mathcal{G} \leftarrow G_{k+1} \oplus_{v} \mathcal{G}$
:::


(sec_numCFS)=
### Numerical Computation of Chen-Fliess Series



:::{prf:theorem} Orthogonal-Projection-Theorem
:label: my-theorem

From the previous section, we have

```{math}
F_c^N[u](t) = \mathcal{U}\cdot \mathcal{G}
```

:::


%### CFSpy Package

%(sec_simulations)=
%## Simulations


%(sec_futurework)=
%## Future Work
%Accuracy, stability and faster computation

(sec_conclusions)=
## Conclusions

This work has presented a numerical way to compute the Chen-Fliess series in Python package.
For this the definition of the iterative integral has being equivalently modified similar
to the Lie derivative. The algorithms are provided. As future work, this need to be
optimized for a faster computation.
