type Profession = 'student' | 'freelancer' | 'productOwner' | 'engineer' | 'systemAnalytics';
type CustomerID = number;

interface User {
    firstName: string;
    customerID: CustomerID;
    profession: Profession;
    lastName?: string;
    note?: string;
}

export type { User, Profession, CustomerID };