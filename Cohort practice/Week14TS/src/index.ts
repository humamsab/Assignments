interface User {
    name: string;
    age: number;
};

function sumofAge(user1: User, user2: User) {
    return user1.age + user2.age;
}

const result = sumofAge({ name: 'Taro', age:20 }, { name: 'Joro', age: 30 });
console.log(result);