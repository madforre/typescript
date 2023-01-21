const sum = (a: number, b: number) => { // 리턴 값에 타입을 적지않아도 자동으로 타입 추론해준 모습
    return a + b;
};

sum(10, 20);