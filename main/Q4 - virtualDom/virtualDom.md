What is virtual DOM and what purpose does it aim to solve??

- virtual DOM 主要透過 diff 算法節省操作 DOM 的成本
  - 在操作的最後 根據 virtual DOM 的變動結果 與實際 DOM 進行比較 只修改有變動的部分
- 但是在 DOM 操作次數不多的情況下可能反而會比直接操作 DOM 的成本還高
