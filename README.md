# cathey Test - 前端開發面試題解答專案

這是一個包含多個前端開發面試題解答的 TypeScript 專案，展示了企業級開發的最佳實踐。

## 🚀 專案特色

- **TypeScript 支援**: 完整的型別安全和開發體驗
- **測試驅動**: 使用 Jest 進行單元測試
- **程式碼品質**: ESLint + Prettier 確保程式碼品質
- **企業級架構**: 展示生產環境的最佳實踐

## 📁 專案結構

```
cathey_test/
├── Q1sortUsersByName.ts          # 用戶排序功能
├── sortUsersByName.test.ts       # 排序功能測試
├── info.ts                       # 面試題解答集合
├── package.json                  # 專案依賴和腳本
├── tsconfig.json                 # TypeScript 配置
├── jest.config.js                # Jest 測試配置
├── jest.setup.js                 # Jest 環境設定
├── .eslintrc.js                  # ESLint 配置
├── .prettierrc                   # Prettier 配置
├── .gitignore                    # Git 忽略檔案
└── README.md                     # 專案說明
```

## 🛠️ 安裝和設定

### 1. 安裝依賴
`
```bash
npm install
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

# 程式碼品質檢查
npm run lint

# 自動修復程式碼問題
npm run lint:fix

# 程式碼格式化
npm run format
```

## 🧪 測試

專案使用 Jest 作為測試框架，支援：

- 單元測試
- 測試覆蓋率報告
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
- 路徑別名支援

### 建置配置

- 輸出到 `dist/` 目錄
- 源碼映射支援
- 宣告檔案生成

## 📚 主要功能

### 1. 用戶排序 (`Q1sortUsersByName.ts`)

- 支援多語言排序 (中文、英文)
- 處理可選欄位
- 數字排序支援
- 特殊字符處理

### 2. 面試題解答 (`info.ts`)

- 陣列排序最佳實踐
- CSS 特異性問題解決
- React 狀態管理方案
- 性能優化技巧

## 🚀 快速開始

1. **克隆專案**
   ```bash
   git clone <repository-url>
   cd cathey_test
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

## 📊 測試覆蓋率

專案設定 80% 的測試覆蓋率要求，確保程式碼品質：

- 分支覆蓋率: 80%
- 函數覆蓋率: 80%
- 行覆蓋率: 80%
- 語句覆蓋率: 80%

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 📞 聯絡資訊

如有問題或建議，請開啟 Issue 或聯絡專案維護者。

---

**注意**: 這是一個學習和展示專案，展示了企業級前端開發的最佳實踐和設計模式。
