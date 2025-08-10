import { CustomerID, Profession, User } from "../type";


const _sanitizeString = (value: string) => {
    return String(value || '').trim().replace(/\s+/g, ' ');
}

const validateCustomerID = (value: unknown): value is CustomerID => {
    return typeof value === 'number' &&
        Number.isInteger(value) &&
        value > 0;
};


const sortUserName = (users: User[]) => {
    if (!Array.isArray(users) || users.length === 0) return [];

    return users.sort((userA: User, userB: User) => {
        const _buildSortKey = (user: User) => {
            if (!user || typeof user !== 'object') return '';

            const firstName = _sanitizeString(user.firstName);
            const lastName = _sanitizeString(user.lastName || '');
            const customerID = validateCustomerID(user.customerID) ? user.customerID : '';

            return [firstName, lastName, customerID]
                .filter(part => part !== '')
                .join('') || '';
        };

        const sortKeyA = _buildSortKey(userA);
        const sortKeyB = _buildSortKey(userB);

        return sortKeyA.localeCompare(sortKeyB, ['zh-TW', 'zh-CN', 'en'], {
            numeric: true,
            sensitivity: 'base',
            ignorePunctuation: true
        });
    });
};

export default sortUserName;

/* for test */
const createCustomerID = (value: unknown): CustomerID | null => {
    if (validateCustomerID(value)) {
        return value;
    }
    return null;
};

const generateSampleUsers = (count: number): User[] => {
    // 生成隨機的用戶資料 需要處理可選資料
    return Array.from({ length: count }, (_, index) => {
        // 隨機決定是否包含 lastName
        const shouldIncludeLastName = Math.random() > 0.3; // 70% 機率有 lastName
        const shouldIncludeNote = Math.random() > 0.5;     // 50% 機率有 note

        return {
            firstName: `User${index + 1}`,
            ...(shouldIncludeLastName && { lastName: `Last${index + 1}` }),
            customerID: createCustomerID(index + 1) as CustomerID,
            ...(shouldIncludeNote && { note: `Note for user ${index + 1}` }),
            profession: ['student', 'freelancer', 'productOwner', 'engineer', 'systemAnalytics'][index % 5] as Profession
        };
    });
};

const users = generateSampleUsers(10000);

const sampleTestUsers: User[] = [
    {
        firstName: "Alice",
        lastName: "Smith",
        customerID: createCustomerID(1001) as CustomerID,
        note: "VIP customer",
        profession: "engineer"
    },
    {
        firstName: "Bob",
        // 沒有 lastName
        customerID: createCustomerID(1002) as CustomerID,
        // 沒有 note
        profession: "student"
    },
    {
        firstName: "Charlie",
        lastName: "Brown",
        customerID: createCustomerID(1003) as CustomerID,
        note: "Regular customer",
        profession: "freelancer"
    },
    {
        firstName: "Diana",
        // 沒有 lastName
        customerID: createCustomerID(1004) as CustomerID,
        note: "New customer",
        profession: "productOwner"
    }
];

const sortedUsers = sortUserName(users);
const sortedSampleUsers = sortUserName(sampleTestUsers);

console.log("Generated users count:", users.length);
console.log("Test users sorted:", sortedSampleUsers);
console.log("First 5 generated users sorted:", sortedUsers.slice(0, 5));