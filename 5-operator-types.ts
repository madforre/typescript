// Union Type - 자바스크립트의 OR 연산자( || )와 같이 A이거나 B이다 라는 의미의 타입.
const logText = (text: string | number) => {
    // ...
}; 
// 위 함수의 파라미터 text에는 문자열이나 숫자 타입이 모두 올 수 있음. 
// 이처럼 | 연산자를 이용하여 타입을 여러개 연결하는 방식을 유니온 타입 정의 방식이라고 한다.

// Union Type의 장점 - 자동완성
function getAge(age: any) { // - any를 사용하는 경우
    age.toFixed(); // age의 타입이 any로 추론되기 때문에 숫자 관련된 메소드 작성시 코드 자동완섵 x
    return age;
}

function getAge_2(age: number | string) {
    if (typeof age === 'number') {
        age.toFixed(); // 정상 동작, age의 타입이 `number`로 추론되기 때문에 숫자 관련된 메소드 자동완성됨.
        return age;
    }
    if (typeof age === 'string') {
        return age;
    }
    return new TypeError('age must be number or string');
}
// any를 사용하는 경우 마치 자바스크립트로 작성하는 것처럼 동작을 한다. 또한 유니온 타입을 사용하면 타입스크립트의 이점을 살리면서 코딩할 수 있다.

// Intersection Type - 여러 타입을 모두 만족하는 하나의 타입을 의미.
interface Person {
    name: string;
    age: number;
}
interface WebDeveloper {
    name: string;
    skill: number;
}

type Madforre = Person & WebDeveloper
// Person 인터페이스의 타입 정의와 WebDeveloper 인터페이스의 타입 정의를 & 연산자를 이용하여 합친 후 Madforre라는 타입에 할당했음.
// 결과적으로 Madforre의 타입은 아래와 같이 정의됨.
// {
//     name: string;
//     age: number;
//     skill: string;
// }
// 이처럼 & 연산자를 이용해 여러 개의 타입 정의를 하나로 합치는 방식을 인터섹션 타입 정의 방식이라고 함.

// Union Type을 쓸 때 주의할 점
interface Person {
    name: string;
    age: number;
}
interface Character {
    name: string;
    skill: string;
}
function play(someone: Person | Character) {
    someone.name; // O 정상 동작
    someone.age; // X 타입 오류
    someone.skill; // X 타입 오류
}
// 타입스크립트 관점에서는 introduce() 함수를 호출하는 시점에 Person 타입이 올지 Developer 타입이 올지 알 수가 없기 때문에 
// 어느 타입이 들어오든 간에 오류가 안 나는 방향으로 타입을 추론하게 된다.
const man: Person = { name: 'aoc', age: 20 };
play(man); // 만약 `play` 함수 안에서 `someone.skill` 속성을 접근하고 있으면 런타임시 함수에서 오류 발생

const hero: Character = { name: 'stonecold', skill: 'stone throwing' };
play(hero); // 만약 `play` 함수 안에서 `someone.age` 속성을 접근하고 있으면 런타임시 함수에서 오류 발생
// 함수 안에서는 별도의 타입 가드(Type Guard)를 이용하여 타입의 범위를 좁히지 않는 이상, 
// 기본적으로는 공통적으로 들어있는 속성인 name만 접근할 수 있게 된다.

// 타입가드란?
// 유니온 타입의 인자를 처리할 때 정확히 어떤 타입인지 검사해야 할 경우가 있는데 이것은 타입 가드라고 한다.
// A type guard is some expression that performs a runtime check that guarantees the type in some scope. (출처:typescriptlang.org)
// 타입 가드는 특정 범위 안에서 런타임 타입 검사를 수행하는 표현식이다.

// 원시 타입을 검사하려면 타입을 문자열로 반환하는 typeof 연산자를 사용한다.
// 클래스 객체을 검사하려면 instanceof 연산자를 사용한다.
// 마지막으로 일반 객체로 섞인 유니온 타입을 검사하려면 사용자 정의 타입 가드를 사용한다.
function introduce(someone: Person | Character) {
    console.log(someone.name); // O 정상 동작 (name은 공통 속성이므로 정상적으로 동작한다.)
}



