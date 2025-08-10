#!/bin/bash

# 建置腳本
echo "🚀 開始建置專案..."

# 清理舊的建置檔案
echo "🧹 清理舊的建置檔案..."
npm run clean

# 安裝依賴
echo "📦 檢查依賴..."
if [ ! -d "node_modules" ]; then
    echo "📥 安裝依賴..."
    npm install
fi

# 執行程式碼品質檢查
echo "🔍 執行程式碼品質檢查..."
npm run lint

# 執行測試
echo "🧪 執行測試..."
npm test

# 建置專案
echo "🔨 建置專案..."
npm run build

# 檢查建置結果
if [ -d "dist" ]; then
    echo "✅ 建置成功！"
    echo "📁 輸出目錄: dist/"
    echo "📊 建置檔案:"
    ls -la dist/
else
    echo "❌ 建置失敗！"
    exit 1
fi

echo "🎉 建置完成！"
