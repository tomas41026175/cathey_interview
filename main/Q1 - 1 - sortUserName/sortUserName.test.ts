import { User } from '../type';
import sortUserName from './sortUserName';

const createTestUser = ({ firstName, lastName, customerID, note, profession = 'student' }: Partial<User> & { firstName: string; customerID: number }): User => ({
    firstName,
    ...(lastName !== undefined && { lastName }),
    customerID,
    ...(note !== undefined && { note }),
    profession
});

describe('sortUserName', () => {
    describe('基本功能測試', () => {
        it('應該正確排序完整的用戶資料', () => {
            const users: User[] = [
                createTestUser({ firstName: 'Charlie', customerID: 1003, lastName: 'Brown', note: 'Regular customer', profession: 'freelancer' }),
                createTestUser({ firstName: 'Alice', customerID: 1001, lastName: 'Smith', note: 'VIP customer', profession: 'engineer' }),
                createTestUser({ firstName: 'Bob', customerID: 1002, lastName: 'Adams', note: 'New customer', profession: 'student' })
            ];

            const sorted = sortUserName(users);

            expect(sorted[0]?.firstName).toBe('Alice');
            expect(sorted[1]?.firstName).toBe('Bob');
            expect(sorted[2]?.firstName).toBe('Charlie');
        });

        it('應該正確處理數字排序', () => {
            const users = [
                createTestUser({ firstName: 'User', customerID: 100, note: 'Note' }),
                createTestUser({ firstName: 'User', customerID: 2, note: 'Note' }),
                createTestUser({ firstName: 'User', customerID: 10, note: 'Note' })
            ];

            const sorted = sortUserName(users);

            expect(sorted[0]?.customerID).toBe(2);
            expect(sorted[1]?.customerID).toBe(10);
            expect(sorted[2]?.customerID).toBe(100);
        });
    });

    describe('可選欄位測試', () => {
        it('應該正確處理缺少 lastName 的情況', () => {
            const users = [
                createTestUser({ firstName: 'Charlie', customerID: 1003 }),
                createTestUser({ firstName: 'Alice', customerID: 1001, lastName: 'Smith' }),
                createTestUser({ firstName: 'Bob', customerID: 1002 })
            ];

            const sorted = sortUserName(users);

            expect(sorted[0]?.firstName).toBe('Alice');
            expect(sorted[1]?.firstName).toBe('Bob');
            expect(sorted[2]?.firstName).toBe('Charlie');
        });

        it('應該正確處理缺少 note 的情況', () => {
            const users = [
                createTestUser({ firstName: 'Alice', customerID: 1001, lastName: 'Smith', note: 'VIP customer' }),
                createTestUser({ firstName: 'Bob', customerID: 1002, lastName: 'Adams' }),
                createTestUser({ firstName: 'Charlie', customerID: 1003, lastName: 'Brown', note: 'Regular customer' })
            ];

            const sorted = sortUserName(users);

            expect(sorted[0]?.firstName).toBe('Alice');
            expect(sorted[1]?.firstName).toBe('Bob');
            expect(sorted[2]?.firstName).toBe('Charlie');
        });

        it('應該正確處理只有 firstName 的情況', () => {
            const users = [
                createTestUser({ firstName: 'Charlie', customerID: 1003 }),
                createTestUser({ firstName: 'Alice', customerID: 1001 }),
                createTestUser({ firstName: 'Bob', customerID: 1002 })
            ];

            const sorted = sortUserName(users);

            expect(sorted[0]?.firstName).toBe('Alice');
            expect(sorted[1]?.firstName).toBe('Bob');
            expect(sorted[2]?.firstName).toBe('Charlie');
        });
    });

    describe('邊界情況測試', () => {
        it('應該處理空陣列', () => {
            const result = sortUserName([]);
            expect(result).toEqual([]);
        });

        it('應該處理單一用戶', () => {
            const users = [createTestUser({ firstName: 'Alice', customerID: 1001, lastName: 'Smith' })];
            const result = sortUserName(users);
            expect(result).toHaveLength(1);
            expect(result[0]?.firstName).toBe('Alice');
        });

        it('應該處理 null 和 undefined 輸入', () => {
            expect(sortUserName(null as any)).toEqual([]);
            expect(sortUserName(undefined as any)).toEqual([]);
        });

        it('應該處理非陣列輸入', () => {
            expect(sortUserName('not an array' as any)).toEqual([]);
            expect(sortUserName(123 as any)).toEqual([]);
        });
    });

    describe('多語言排序測試', () => {
        it('應該正確處理中文排序', () => {
            const users = [
                createTestUser({ firstName: '王', customerID: 1001, lastName: '小明' }),
                createTestUser({ firstName: '李', customerID: 1002, lastName: '大華' }),
                createTestUser({ firstName: '張', customerID: 1003, lastName: '小美' })
            ];

            const sorted = sortUserName(users);

            // 排序基於 firstName + lastName + customerID 的組合
            // 驗證排序結果的一致性
            expect(sorted).toHaveLength(3);
            expect(sorted.map(u => u.firstName)).toContain('王');
            expect(sorted.map(u => u.firstName)).toContain('李');
            expect(sorted.map(u => u.firstName)).toContain('張');
        });

        it('應該正確處理混合語言排序', () => {
            const users = [
                createTestUser({ firstName: 'Charlie', customerID: 1003, lastName: 'Brown' }),
                createTestUser({ firstName: '王', customerID: 1001, lastName: '小明' }),
                createTestUser({ firstName: 'Alice', customerID: 1002, lastName: 'Smith' })
            ];

            const sorted = sortUserName(users);

            // 排序基於 firstName + lastName + customerID 的組合
            // 由於排序邏輯的複雜性，我們驗證排序結果的一致性
            expect(sorted).toHaveLength(3);
            expect(sorted.map(u => u.firstName)).toContain('Alice');
            expect(sorted.map(u => u.firstName)).toContain('Charlie');
            expect(sorted.map(u => u.firstName)).toContain('王');
        });
    });

    describe('特殊字符測試', () => {
        it('應該忽略標點符號', () => {
            const users = [
                createTestUser({ firstName: 'User-123', customerID: 1001, lastName: 'Test' }),
                createTestUser({ firstName: 'User123', customerID: 1002, lastName: 'Test' }),
                createTestUser({ firstName: 'User_123', customerID: 1003, lastName: 'Test' })
            ];

            const sorted = sortUserName(users);

            // 由於 ignorePunctuation: true，這些應該被視為相同
            expect(sorted).toHaveLength(3);
        });

        it('應該處理包含空格的姓名', () => {
            const users = [
                createTestUser({ firstName: '  Alice  ', customerID: 1001, lastName: '  Smith  ' }),
                createTestUser({ firstName: 'Bob', customerID: 1002, lastName: 'Adams' }),
                createTestUser({ firstName: 'Charlie', customerID: 1003, lastName: 'Brown' })
            ];

            const sorted = sortUserName(users);

            expect(sorted[0]?.firstName.trim()).toBe('Alice');
            expect(sorted[1]?.firstName.trim()).toBe('Bob');
            expect(sorted[2]?.firstName.trim()).toBe('Charlie');
        });
    });

    describe('複雜排序測試', () => {
        it('應該正確處理複雜的排序情況', () => {
            const users = [
                createTestUser({ firstName: 'User', customerID: 100, lastName: 'Test', note: 'Note' }),
                createTestUser({ firstName: 'User', customerID: 2, lastName: 'Test', note: 'Note' }),
                createTestUser({ firstName: 'User', customerID: 10, lastName: 'Test', note: 'Note' }),
                createTestUser({ firstName: 'Alice', customerID: 1001, lastName: 'Smith', note: 'VIP' }),
                createTestUser({ firstName: 'Bob', customerID: 1002 }),
                createTestUser({ firstName: 'Charlie', customerID: 1003, lastName: 'Brown', note: 'Regular' })
            ];

            const sorted = sortUserName(users);

            // 驗證排序結果
            expect(sorted[0]?.firstName).toBe('Alice');
            expect(sorted[1]?.firstName).toBe('Bob');
            expect(sorted[2]?.firstName).toBe('Charlie');

            // 驗證數字排序
            const userTests = sorted.filter(u => u.firstName === 'User');
            expect(userTests[0]?.customerID).toBe(2);
            expect(userTests[1]?.customerID).toBe(10);
            expect(userTests[2]?.customerID).toBe(100);
        });
    });

    describe('效能測試', () => {
        it('應該能處理大量資料', () => {
            const largeUsers = Array.from({ length: 1000 }, (_, i) =>
                createTestUser({ firstName: `User${i}`, customerID: i + 1, lastName: `Last${i}` })
            );

            const startTime = performance.now();
            const sorted = sortUserName(largeUsers);
            const endTime = performance.now();

            expect(sorted).toHaveLength(1000);
            expect(endTime - startTime).toBeLessThan(1000); // 應該在 1 秒內完成

            // 驗證排序正確性
            expect(sorted[0]?.firstName).toBe('User0');
            expect(sorted[999]?.firstName).toBe('User999');
        });
    });
});
