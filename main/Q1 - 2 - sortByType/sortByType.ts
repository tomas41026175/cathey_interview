import sortUserName from "../Q1 - 1 - sortUserName/sortUserName";
import { User } from "../type";

const PROFESSION_CONFIG = {
    weights: {
        'systemAnalytics': 5,
        'engineer': 4,
        'productOwner': 3,
        'freelancer': 2,
        'student': 1
    },
    defaultWeight: 0
};


const sortByType = (users: User[]) => {
    if (!Array.isArray(users)) return [];

    return users.sort((a: User, b: User) => {
        const weightA = PROFESSION_CONFIG.weights[a.profession] ?? PROFESSION_CONFIG.defaultWeight;
        const weightB = PROFESSION_CONFIG.weights[b.profession] ?? PROFESSION_CONFIG.defaultWeight;

        if (weightA === weightB) {
            return sortUserName([a, b])[0] === a ? -1 : 1;
        }

        return weightB - weightA;
    });
}

export default sortByType;