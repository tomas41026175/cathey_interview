/* 
    Q1. 
*/
const getUniqueNumber = (items: number[]) => {
    if (!Array.isArray(items)) {
        throw new TypeError('Expected array, got ' + typeof items);
    }

    if (items.length === 0) return [];


    if (items.length < 1000) {
        return dedupeSmall(items);
    } else if (items.length < 10000) {
        return dedupeMedium(items);
    } else {
        return dedupeLarge(items);
    }
}

// 小數據量：可讀性優先
const dedupeSmall = (items: number[]) => {
    return [...new Set(items)];
}

// 中等數據量：平衡性能和記憶體
const dedupeMedium = (items: number[]) => {
    const seen = new Set();
    const result = [];

    for (const item of items) {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    }

    return result;
}

// 大數據量：最大化性能
const dedupeLarge = (items: number[]) => {
    const seen = new Map();
    const result = [];
    let index = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!seen.has(item)) {
            seen.set(item, index++);
            result.push(item);
        }
    }

    return result;
}

const dedupeObjects = (items: any[], keySelector = (item: any) => item.id) => {
    if (!Array.isArray(items)) return [];

    const seen = new Map();
    return items.filter(item => {
        const key = keySelector(item);
        if (seen.has(key)) return false;
        seen.set(key, true);
        return true;
    });
}

// 性能測試工具 (開發階段使用)
const benchmarkDedupe = (items: number[], iterations = 1000) => {
    const methods = {
        set: () => [...new Set(items)],
        filter: () => items.filter((item, index) => items.indexOf(item) === index),
        reduce: () => items.reduce((acc: number[], item) => acc.includes(item) ? acc : [...acc, item], [] as number[]),
        optimized: () => getUniqueNumber(items)
    };

    const results: Record<string, number> = {};

    for (const [name, method] of Object.entries(methods)) {
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            method();
        }
        const end = performance.now();
        results[name] = end - start;
    }

    return results;
}

// 導出函數
export default getUniqueNumber;
export { dedupeObjects, benchmarkDedupe };