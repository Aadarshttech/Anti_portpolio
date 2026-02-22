# Longest Common Subsequence (LCS) Playground

## What is LCS?
The **Longest Common Subsequence (LCS)** problem asks for the longest sequence of characters that appears **in the same order** (but not necessarily contiguously) in two strings. It is a classic dynamic‑programming example used to illustrate DP table construction, back‑tracking, and optimal sub‑structure.

## How the Playground Was Built
1. **Dynamic‑Programming Table** – A 2‑D matrix `dp[m+1][n+1]` is filled where `dp[i][j]` stores the length of the LCS of the prefixes `X[0..i)` and `Y[0..j)`. The recurrence is:
   ```
   if X[i‑1] === Y[j‑1] then dp[i][j] = dp[i‑1][j‑1] + 1
   else dp[i][j] = max(dp[i‑1][j], dp[i][j‑1])
   ```
2. **Back‑tracking** – Starting from `dp[m][n]`, we walk back through the table to reconstruct the actual subsequence.
3. **React UI** – The UI lives in `app/playground/lcs/page.tsx` and shows:
   - Input fields for the two strings.
   - A visual DP table where the current cell is highlighted during step‑by‑step execution.
   - Controls to **Compute**, **Step**, **Auto‑run**, and **Reset**.
   - The final LCS string and its length displayed below the table.
4. **Performance Guard** – If `m * n` exceeds `250 000` the app warns the user to avoid freezing the browser.

## Presentable Class Text (Slide‑Ready)
```
**Longest Common Subsequence (LCS)**

- **Definition**: The longest sequence that appears in the same order in two strings.
- **DP Table**: `dp[i][j]` = length of LCS for prefixes `X[0..i)` and `Y[0..j)`.
  - If characters match → `dp[i‑1][j‑1] + 1`
  - Else → `max(dp[i‑1][j], dp[i][j‑1])`
- **Reconstruction**: Walk back from `dp[m][n]` to build the subsequence.
- **Complexity**: `O(m·n)` time, `O(m·n)` space (can be reduced to `O(min(m,n))`).
- **Playground Features**:
  - Interactive DP table visualisation.
  - Step‑by‑step execution with highlights.
  - Auto‑run with adjustable speed.
  - Guard against large inputs.
```

Feel free to open the playground at `http://localhost:3000/playground/lcs` (or the deployed URL) and experiment with different strings.

---
*Created by Antigravity – your AI coding assistant.*
