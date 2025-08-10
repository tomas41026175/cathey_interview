import getUniqueNumber from './getUniqueNumber';

/* quest data */
const items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5,
    4, 4, 7, 8, 8, 0, 1, 2, 3, 1]

// 基本測試資料
const emptyArray: number[] = [];
const singleElement: number[] = [42];
const noDuplicates: number[] = [1, 2, 3, 4, 5];
const allDuplicates: number[] = [1, 1, 1, 1, 1];
const partialDuplicates: number[] = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const negativeAndZero: number[] = [-1, 0, 1, -1, 0, 2, -2];
const decimals: number[] = [1.1, 2.2, 1.1, 3.3, 2.2];
const largeNumbers: number[] = [1000000, 999999, 1000000, 888888];

// 邊界測試資料
const smallBoundary: number[] = Array.from({ length: 999 }, (_, i) => i % 100);
const mediumBoundary: number[] = Array.from({ length: 9999 }, (_, i) => i % 1000);
const largeBoundary: number[] = Array.from({ length: 10000 }, (_, i) => i % 1000);
const veryLarge: number[] = Array.from({ length: 15000 }, (_, i) => i % 2000);

// 特殊情況測試資料
const maxValues: number[] = [Number.MAX_SAFE_INTEGER, Number.MAX_VALUE, Number.MAX_SAFE_INTEGER];
const minValues: number[] = [Number.MIN_SAFE_INTEGER, Number.MIN_VALUE, Number.MIN_SAFE_INTEGER];
const withNaN: number[] = [1, NaN, 2, NaN, 3];
const withInfinity: number[] = [1, Infinity, 2, -Infinity, 3];

const userIds: number[] = [1001, 1002, 1001, 1003, 1002, 1004, 1001];
const prices: number[] = [99.99, 149.99, 99.99, 199.99, 149.99, 299.99];
const ratings: number[] = [5, 4, 5, 3, 4, 5, 2, 3, 4, 5];
const timestamps: number[] = [1640995200000, 1640995200000, 1641081600000, 1641081600000, 1641168000000];

const highDuplicateRate: number[] = Array.from({ length: 10000 }, (_, i) => i % 10);

// 測試案例
describe('getUniqueNumber', () => {
    test('應該處理空陣列', () => {
        expect(getUniqueNumber(emptyArray)).toEqual([]);
    });

    test('應該處理單一元素陣列', () => {
        expect(getUniqueNumber(singleElement)).toEqual([42]);
    });

    test('應該處理無重複元素的陣列', () => {
        expect(getUniqueNumber(noDuplicates)).toEqual([1, 2, 3, 4, 5]);
    });

    test('應該處理全部重複元素的陣列', () => {
        expect(getUniqueNumber(allDuplicates)).toEqual([1]);
    });

    test('應該處理部分重複元素的陣列', () => {
        expect(getUniqueNumber(partialDuplicates)).toEqual([1, 2, 3, 4, 5]);
    });

    test('應該處理負數和零', () => {
        expect(getUniqueNumber(negativeAndZero)).toEqual([-1, 0, 1, 2, -2]);
    });

    test('應該處理小數', () => {
        expect(getUniqueNumber(decimals)).toEqual([1.1, 2.2, 3.3]);
    });

    test('應該處理大數字', () => {
        expect(getUniqueNumber(largeNumbers)).toEqual([1000000, 999999, 888888]);
    });

    test('應該處理極大值', () => {
        const result = getUniqueNumber(maxValues);
        expect(result.length).toBeLessThanOrEqual(3);
        expect(result).toEqual([...new Set(maxValues)]);
    });

    test('應該處理極小值', () => {
        const result = getUniqueNumber(minValues);
        expect(result.length).toBeLessThanOrEqual(3);
        expect(result).toEqual([...new Set(minValues)]);
    });

    test('應該處理包含 NaN 的陣列', () => {
        const result = getUniqueNumber(withNaN);
        expect(result.length).toBeLessThanOrEqual(4);
        expect(result).toEqual([...new Set(withNaN)]);
    });

    test('應該處理包含 Infinity 的陣列', () => {
        const result = getUniqueNumber(withInfinity);
        expect(result.length).toBeLessThanOrEqual(5);
        expect(result).toEqual([...new Set(withInfinity)]);
    });

    test('應該處理原始測試資料', () => {
        const expected = [1, 5, 2, 3, 4, 7, 8, 9, 0, 6];
        expect(getUniqueNumber(items)).toEqual(expected);
    });

    test('應該處理小數據量邊界', () => {
        const result = getUniqueNumber(smallBoundary);
        expect(result.length).toBeLessThanOrEqual(100);
        expect(result).toEqual([...new Set(smallBoundary)]);
    });

    test('應該處理中等數據量邊界', () => {
        const result = getUniqueNumber(mediumBoundary);
        expect(result.length).toBeLessThanOrEqual(1000);
        expect(result).toEqual([...new Set(mediumBoundary)]);
    });

    test('應該處理大數據量邊界', () => {
        const result = getUniqueNumber(largeBoundary);
        expect(result.length).toBeLessThanOrEqual(1000);
        expect(result).toEqual([...new Set(largeBoundary)]);
    });

    test('應該處理極大數據量', () => {
        const result = getUniqueNumber(veryLarge);
        expect(result.length).toBeLessThanOrEqual(2000);
        expect(result).toEqual([...new Set(veryLarge)]);
    });

    test('應該處理實際應用場景 - 用戶ID', () => {
        expect(getUniqueNumber(userIds)).toEqual([1001, 1002, 1003, 1004]);
    });

    test('應該處理實際應用場景 - 價格', () => {
        expect(getUniqueNumber(prices)).toEqual([99.99, 149.99, 199.99, 299.99]);
    });

    test('應該處理實際應用場景 - 評分', () => {
        expect(getUniqueNumber(ratings)).toEqual([5, 4, 3, 2]);
    });

    test('應該處理實際應用場景 - 時間戳記', () => {
        expect(getUniqueNumber(timestamps)).toEqual([1640995200000, 1641081600000, 1641168000000]);
    });

    test('應該處理高重複率數據', () => {
        const result = getUniqueNumber(highDuplicateRate);
        expect(result.length).toBeLessThanOrEqual(10);
        expect(result).toEqual([...new Set(highDuplicateRate)]);
    });

    test('應該拋出錯誤當輸入不是陣列', () => {
        expect(() => getUniqueNumber(null as any)).toThrow(TypeError);
        expect(() => getUniqueNumber(undefined as any)).toThrow(TypeError);
        expect(() => getUniqueNumber('string' as any)).toThrow(TypeError);
        expect(() => getUniqueNumber(123 as any)).toThrow(TypeError);
    });

    test('應該保持原始順序', () => {
        const input = [3, 1, 2, 1, 3, 2];
        const result = getUniqueNumber(input);
        expect(result).toEqual([3, 1, 2]);
    });
});
