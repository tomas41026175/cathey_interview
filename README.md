# cathey Interview Test

## 📁 專案結構

```
cathey_interview/
├── main/                           # 主要面試題目目錄
│   ├── Q1 - 1 - sortUserName/     # Q1-1: 用戶姓名排序
│   │   ├── sortUserName.ts        # 排序功能實作
│   │   └── sortUserName.test.ts   # 排序功能測試
│   ├── Q1 - 2 - sortByType/       # Q1-2: 按類型排序
│   │   ├── sortByType.ts          # 類型排序實作
│   │   └── sortByType.test.ts     # 類型排序測試
│   ├── Q2 - HTML/                  # Q2: HTML 和 CSS 實作
│   │   ├── quest.html             # HTML 結構
│   │   └── quest.css              # CSS 樣式
│   ├── Q3 - getUniqueNumber/      # Q3: 獲取唯一數字
│   │   ├── getUniqueNumber.ts     # 唯一數字邏輯
│   │   └── getUniqueNumber.test.ts # 唯一數字測試
│   ├── Q4 - virtualDom/           # Q4: 虛擬 DOM 概念
│   │   └── virtualDom.md          # 虛擬 DOM 說明
│   ├── Q5 - typescript/           # Q5: TypeScript 概念
│   │   └── diff of never & void.md # never vs void 差異
│   ├── Q6 - framework/            # Q6: 框架相關概念
│   │   └── framework.md           # 框架說明文件
│   ├── Q7 - React/                # Q7: React 實作
│   │   └── index.tsx              # React 組件
│   ├── Q8 - reviewTodoList/       # Q8: Todo 清單審查
│   │   └── index.tsx              # Todo 清單組件
│   ├── Q9 - reviewParentComponent/ # Q9: 父組件審查
│   │   └── index.tsx              # 父組件實作
│   ├── Q10 - searchingFocus/      # Q10: 搜尋焦點功能
│   │   └── index.tsx              # 搜尋焦點組件
│   └── type.ts                    # 共用型別定義
├── scripts/                        # 建置和測試腳本
│   ├── build.sh                   # 建置腳本
│   └── test.sh                    # 測試腳本
├── coverage/                       # 測試覆蓋率報告
├── package.json                    # 專案依賴和腳本
├── tsconfig.json                   # TypeScript 配置
├── tsconfig.test.json              # 測試環境 TypeScript 配置
├── jest.config.js                  # Jest 測試配置
├── jest.setup.js                   # Jest 環境設定
├── .eslintrc.js                    # ESLint 配置
├── .prettierrc                     # Prettier 配置
├── .gitignore                      # Git 忽略檔案
└── README.md                       # 專案說明
```

## 🛠️ 安裝和設定

### 1. 安裝依賴

```bash
npm install
# 或使用 pnpm
pnpm install
```

### 2. 開發環境設定

```bash
# 開發模式 (監聽檔案變更)
npm run dev

# 建置專案
npm run build

# 執行測試
npm test

# 監聽測試
npm run test:watch

# 生成測試覆蓋率報告
npm run test:coverage

# 程式碼品質檢查
npm run lint

# 自動修復程式碼問題
npm run lint:fix

# 程式碼格式化
npm run format

# 清理建置檔案
npm run clean

# 啟動建置後的應用
npm start
```

## 🧪 測試

專案使用 Jest 作為測試框架，支援：

- 單元測試
- 測試覆蓋率報告 (80% 要求)
- 測試環境設定
- 全域測試輔助函數

### 執行測試

```bash
# 執行所有測試
npm test

# 監聽模式
npm run test:watch

# 生成覆蓋率報告
npm run test:coverage

# 使用腳本執行完整測試流程
./scripts/test.sh
```

## 📝 程式碼品質

### ESLint

- TypeScript 支援
- Jest 測試規則
- 企業級程式碼標準

### Prettier

- 自動程式碼格式化
- 一致的程式碼風格
- 與 ESLint 整合

## 🔧 開發工具

### TypeScript 配置

- 嚴格模式啟用
- 現代 ES2020 目標
- 完整的型別檢查
- 路徑別名支援 (`@/*`)
- JSX 支援 (React 17+)

### 建置配置

- 輸出到 `dist/` 目錄
- 源碼映射支援
- 宣告檔案生成
- 多環境配置支援

## 📚 面試題目詳解

### 1. 用戶排序系列

- **Q1-1: 用戶姓名排序** (`Q1 - 1 - sortUserName/`)
  - 支援多語言排序 (中文、英文)
  - 處理可選欄位
  - 數字排序支援
  - 特殊字符處理

- **Q1-2: 按類型排序** (`Q1 - 2 - sortByType/`)
  - 根據用戶職業類型排序
  - 支援多種排序策略

### 2. 前端基礎

- **Q2: HTML 和 CSS** (`Q2 - HTML/`)
  - 響應式設計實作
  - CSS 特異性問題解決

### 3. 演算法實作

- **Q3: 獲取唯一數字** (`Q3 - getUniqueNumber/`)
  - 陣列去重邏輯
  - 性能優化技巧

### 4. 概念理解

- **Q4: 虛擬 DOM** (`Q4 - virtualDom/`)
  - 虛擬 DOM 原理說明
  - 與真實 DOM 的差異

- **Q5: TypeScript** (`Q5 - typescript/`)
  - `never` 與 `void` 型別差異
  - 進階型別概念

- **Q6: 框架概念** (`Q6 - framework/`)
  - 前端框架比較
  - 選擇考量因素

### 5. React 實作

- **Q7: React 組件** (`Q7 - React/`)
  - 現代 React 語法
  - Hooks 使用範例

- **Q8: Todo 清單審查** (`Q8 - reviewTodoList/`)
  - 組件設計審查
  - 最佳實踐建議

- **Q9: 父組件審查** (`Q9 - reviewParentComponent/`)
  - 組件間通信
  - 狀態管理方案

- **Q10: 搜尋焦點功能** (`Q10 - searchingFocus/`)
  - 搜尋功能實作
  - 焦點管理

## 🚀 快速開始

1. **克隆專案**

   ```bash
   git clone <repository-url>
   cd cathey_interview
   ```

2. **安裝依賴**

   ```bash
   npm install
   ```

3. **執行測試**

   ```bash
   npm test
   ```

4. **開發模式**

   ```bash
   npm run dev
   ```

5. **建置專案**
   ```bash
   npm run build
   # 或使用腳本
   ./scripts/build.sh
   ```

## 🐳 腳本功能

### 建置腳本 (`scripts/build.sh`)

- 自動清理舊建置檔案
- 依賴檢查和安裝
- 程式碼品質檢查
- 測試執行
- 專案建置
- 建置結果驗證

### 測試腳本 (`scripts/test.sh`)

- 依賴檢查
- 程式碼品質檢查
- 單元測試執行
- 覆蓋率報告生成
- 測試結果驗證
