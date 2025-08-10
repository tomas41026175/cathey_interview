#!/bin/bash

# 測試腳本
echo "🧪 開始執行測試..."

# 檢查依賴
if [ ! -d "node_modules" ]; then
    echo "📥 安裝依賴..."
    npm install
fi

# 執行程式碼品質檢查
echo "🔍 執行程式碼品質檢查..."
npm run lint

# 執行測試
echo "🧪 執行單元測試..."
npm test

# 生成測試覆蓋率報告
echo "📊 生成測試覆蓋率報告..."
npm run test:coverage

# 檢查測試結果
if [ $? -eq 0 ]; then
    echo "✅ 所有測試通過！"
    
    # 顯示覆蓋率摘要
    if [ -f "coverage/lcov-report/index.html" ]; then
        echo "📈 測試覆蓋率報告已生成:"
        echo "   📁 HTML 報告: coverage/lcov-report/index.html"
        echo "   📊 覆蓋率摘要: coverage/lcov.info"
    fi
else
    echo "❌ 測試失敗！"
    exit 1
fi

echo "🎉 測試完成！"
