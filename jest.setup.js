

jest.setTimeout(10000);


global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};

// 測試環境清理
afterEach(() => {
    jest.clearAllMocks();
});

// 全域測試輔助函數
global.testHelpers = {
    // 創建測試用戶資料
    createTestUser: (firstName, lastName, customerID, note, profession = 'student') => ({
        firstName,
        lastName,
        customerID,
        note,
        profession
    }),

    // 生成大量測試資料
    generateLargeTestData: (count) => {
        return Array.from({ length: count }, (_, index) => ({
            firstName: `User${index + 1}`,
            lastName: `Last${index + 1}`,
            customerID: index + 1,
            note: `Note for user ${index + 1}`,
            profession: ['student', 'freelancer', 'productOwner', 'engineer', 'systemAnalytics'][index % 5]
        }));
    },

    // 驗證排序結果
    validateSortResult: (sortedArray, expectedOrder) => {
        expect(sortedArray).toHaveLength(expectedOrder.length);
        expectedOrder.forEach((expected, index) => {
            expect(sortedArray[index].firstName).toBe(expected);
        });
    }
};
