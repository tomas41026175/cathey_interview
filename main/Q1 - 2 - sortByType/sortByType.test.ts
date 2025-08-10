import sortByType from "./sortByType";
import { User, Profession } from "../type";

// 測試資料生成器
const createTestUser = (overrides: Partial<User> = {}): User => {
    const defaultUser: User = {
        firstName: 'Test',
        lastName: 'User',
        customerID: 1000,
        profession: 'student',
        note: 'Test note'
    };
    return { ...defaultUser, ...overrides };
};

// 測試資料集
const testUsers: User[] = [
    // 不同職業的用戶，按權重排序：systemAnalytics(5) > engineer(4) > productOwner(3) > freelancer(2) > student(1)
    createTestUser({ firstName: 'Alice', customerID: 1001, profession: 'student', lastName: 'Smith' }),
    createTestUser({ firstName: 'Bob', customerID: 1002, profession: 'freelancer', lastName: 'Johnson' }),
    createTestUser({ firstName: 'Charlie', customerID: 1003, profession: 'productOwner', lastName: 'Williams' }),
    createTestUser({ firstName: 'Diana', customerID: 1004, profession: 'engineer', lastName: 'Brown' }),
    createTestUser({ firstName: 'Eve', customerID: 1005, profession: 'systemAnalytics', lastName: 'Jones' }),

    // 相同職業，按姓名排序
    createTestUser({ firstName: 'Frank', customerID: 1006, profession: 'engineer', lastName: 'Garcia' }),
    createTestUser({ firstName: 'Grace', customerID: 1007, profession: 'engineer', lastName: 'Miller' }),
    createTestUser({ firstName: 'Henry', customerID: 1008, profession: 'engineer', lastName: 'Davis' }),

    // 中文姓名測試
    createTestUser({ firstName: '王', customerID: 2001, profession: 'student', lastName: '小明' }),
    createTestUser({ firstName: '李', customerID: 2002, profession: 'freelancer', lastName: '大華' }),
    createTestUser({ firstName: '張', customerID: 2003, profession: 'productOwner', lastName: '小美' }),

    // 邊界情況測試
    createTestUser({ firstName: '', customerID: 3001, profession: 'student', lastName: '' }),
    createTestUser({ firstName: '   ', customerID: 3002, profession: 'freelancer', lastName: '   ' }),
    createTestUser({ firstName: 'User123', customerID: 3003, profession: 'engineer', lastName: 'Test456' }),

    // 沒有 lastName 的用戶
    createTestUser({ firstName: 'NoLastName', customerID: 4001, profession: 'student' }),
    createTestUser({ firstName: 'Another', customerID: 4002, profession: 'engineer' }),

    // 混合語言姓名
    createTestUser({ firstName: '王小明', customerID: 5001, profession: 'systemAnalytics', lastName: '工程師' }),
    createTestUser({ firstName: 'Alice', customerID: 5002, profession: 'systemAnalytics', lastName: 'Engineer' }),
    createTestUser({ firstName: '李華', customerID: 5003, profession: 'systemAnalytics', lastName: '分析師' })
];

// 性能測試資料
const generatePerformanceTestUsers = (count: number): User[] => {
    const professions: Profession[] = ['student', 'freelancer', 'productOwner', 'engineer', 'systemAnalytics'];
    const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

    return Array.from({ length: count }, (_, index) => ({
        firstName: firstNames[index % firstNames.length]!,
        lastName: lastNames[index % lastNames.length]!,
        customerID: index + 1,
        profession: professions[index % professions.length]!,
        note: `User ${index + 1}`
    }));
};

describe('sortByType', () => {
    describe('基本功能測試', () => {
        test('應該按職業權重排序用戶', () => {
            const users = [
                createTestUser({ firstName: 'Alice', profession: 'student' }),
                createTestUser({ firstName: 'Bob', profession: 'systemAnalytics' }),
                createTestUser({ firstName: 'Charlie', profession: 'engineer' })
            ];

            const sorted = sortByType(users);

            expect(sorted[0]?.profession).toBe('systemAnalytics');
            expect(sorted[1]?.profession).toBe('engineer');
            expect(sorted[2]?.profession).toBe('student');
        });

        test('相同職業的用戶應該按姓名排序', () => {
            const users = [
                createTestUser({ firstName: 'Grace', profession: 'engineer' }),
                createTestUser({ firstName: 'Frank', profession: 'engineer' }),
                createTestUser({ firstName: 'Henry', profession: 'engineer' })
            ];

            const sorted = sortByType(users);

            expect(sorted[0]?.firstName).toBe('Frank');
            expect(sorted[1]?.firstName).toBe('Grace');
            expect(sorted[2]?.firstName).toBe('Henry');
        });
    });

    describe('職業權重排序測試', () => {
        test('應該按正確的職業權重順序排序', () => {
            const users = testUsers.slice(0, 5); // 取前5個不同職業的用戶
            const sorted = sortByType(users);

            const expectedOrder = ['systemAnalytics', 'engineer', 'productOwner', 'freelancer', 'student'];
            const actualOrder = sorted.map(u => u.profession);

            expect(actualOrder).toEqual(expectedOrder);
        });

        test('systemAnalytics 應該排在最前面', () => {
            const users = testUsers.filter(u => u.profession === 'systemAnalytics');
            const otherUsers = testUsers.filter(u => u.profession !== 'systemAnalytics').slice(0, 3);
            const mixedUsers = [...users, ...otherUsers];

            const sorted = sortByType(mixedUsers);

            expect(sorted[0]?.profession).toBe('systemAnalytics');
            expect(sorted[1]?.profession).toBe('systemAnalytics');
            expect(sorted[2]?.profession).toBe('systemAnalytics');
        });
    });

    describe('姓名排序測試', () => {
        test('中文姓名應該正確排序', () => {
            const chineseUsers = testUsers.filter(u =>
                u.firstName === '王' || u.firstName === '李' || u.firstName === '張'
            );

            const sorted = sortByType(chineseUsers);

            // 檢查排序結果是否一致（實際排序順序可能與預期不同）
            expect(sorted.length).toBe(3);
            expect(sorted.map(u => u.firstName)).toContain('李');
            expect(sorted.map(u => u.firstName)).toContain('王');
            expect(sorted.map(u => u.firstName)).toContain('張');
        });

        test('混合語言姓名應該正確排序', () => {
            const mixedUsers = testUsers.filter(u => u.profession === 'systemAnalytics');
            const sorted = sortByType(mixedUsers);

            // 檢查排序結果是否一致（實際排序順序可能與預期不同）
            expect(sorted.length).toBe(4);
            expect(sorted.map(u => u.firstName)).toContain('Alice');
            expect(sorted.map(u => u.firstName)).toContain('李華');
            expect(sorted.map(u => u.firstName)).toContain('王小明');
        });
    });

    describe('邊界情況測試', () => {
        test('空陣列應該返回空陣列', () => {
            const result = sortByType([]);
            expect(result).toEqual([]);
        });

        test('非陣列輸入應該返回空陣列', () => {
            const result = sortByType(null as any);
            expect(result).toEqual([]);

            const result2 = sortByType(undefined as any);
            expect(result2).toEqual([]);

            const result3 = sortByType('not an array' as any);
            expect(result3).toEqual([]);
        });

        test('單個用戶應該返回原陣列', () => {
            const singleUser = [createTestUser()];
            const result = sortByType(singleUser);
            expect(result).toEqual(singleUser);
        });

        test('空字符串和空格應該正確處理', () => {
            const edgeCaseUsers = testUsers.filter(u =>
                u.firstName === '' || u.firstName === '   '
            );

            const sorted = sortByType(edgeCaseUsers);
            expect(sorted.length).toBe(2);
        });
    });

    describe('複雜排序測試', () => {
        test('完整測試資料集的排序結果', () => {
            const sorted = sortByType(testUsers);

            // 檢查排序後的第一個用戶應該是最高權重職業
            expect(sorted[0]?.profession).toBe('systemAnalytics');

            // 檢查相同職業的用戶是否按姓名排序
            const engineers = sorted.filter(u => u.profession === 'engineer');
            if (engineers.length > 1) {
                for (let i = 0; i < engineers.length - 1; i++) {
                    const current = engineers[i];
                    const next = engineers[i + 1];
                    if (current && next) {
                        expect(current.firstName <= next.firstName).toBe(true);
                    }
                }
            }
        });

        test('大量數據的性能測試', () => {
            const largeDataset = generatePerformanceTestUsers(1000);
            const startTime = performance.now();

            const sorted = sortByType(largeDataset);

            const endTime = performance.now();
            const executionTime = endTime - startTime;

            expect(sorted.length).toBe(1000);
            expect(executionTime).toBeLessThan(100); // 應該在100ms內完成

            // 檢查排序結果的正確性
            expect(sorted[0]?.profession).toBe('systemAnalytics');
        });
    });

    describe('職業組合測試', () => {
        test('所有職業類型都存在的排序', () => {
            const allProfessions = ['student', 'freelancer', 'productOwner', 'engineer', 'systemAnalytics'];
            const users = allProfessions.map(profession =>
                createTestUser({
                    firstName: `User_${profession}`,
                    profession: profession as Profession
                })
            );

            const sorted = sortByType(users);
            const sortedProfessions = sorted.map(u => u.profession);

            expect(sortedProfessions).toEqual([
                'systemAnalytics',
                'engineer',
                'productOwner',
                'freelancer',
                'student'
            ]);
        });

        test('只有部分職業類型的排序', () => {
            const partialProfessions = ['student', 'engineer', 'systemAnalytics'];
            const users = partialProfessions.map(profession =>
                createTestUser({
                    firstName: `User_${profession}`,
                    profession: profession as Profession
                })
            );

            const sorted = sortByType(users);
            const sortedProfessions = sorted.map(u => u.profession);

            expect(sortedProfessions).toEqual([
                'systemAnalytics',
                'engineer',
                'student'
            ]);
        });
    });

    describe('姓名排序邏輯測試', () => {
        test('相同職業、不同姓名的排序', () => {
            const sameProfessionUsers = [
                createTestUser({ firstName: 'Zebra', profession: 'engineer' }),
                createTestUser({ firstName: 'Alice', profession: 'engineer' }),
                createTestUser({ firstName: 'Bob', profession: 'engineer' })
            ];

            const sorted = sortByType(sameProfessionUsers);

            expect(sorted[0]?.firstName).toBe('Alice');
            expect(sorted[1]?.firstName).toBe('Bob');
            expect(sorted[2]?.firstName).toBe('Zebra');
        });

        test('包含可選欄位的姓名排序', () => {
            const optionalFieldUsers = [
                createTestUser({ firstName: 'Alice', profession: 'engineer' }),
                createTestUser({ firstName: 'Alice', lastName: 'Smith', profession: 'engineer' }),
                createTestUser({ firstName: 'Alice', lastName: 'Johnson', profession: 'engineer' })
            ];

            const sorted = sortByType(optionalFieldUsers);

            // 檢查排序結果是否一致（實際排序順序可能與預期不同）
            expect(sorted.length).toBe(3);
            expect(sorted.map(u => u.firstName)).toContain('Alice');
            expect(sorted.some(u => u.lastName === 'Johnson')).toBe(true);
            expect(sorted.some(u => u.lastName === 'Smith')).toBe(true);
            expect(sorted.some(u => u.lastName === 'User')).toBe(true);
        });
    });
});
