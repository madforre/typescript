/**
 * 타입 호환 (Type Compatibility) 이란?
 * 
 * 타입스크립트 코드에서 특정 타입이 다른 타입에 잘 맞는지를 의미함.
 * 
 */
interface Gem {
    name: string;
}

class Diamond {
    name: string;
}

let i: Gem;
i = new Diamond(); // OK, because of structural typing.
// C#이나 Java였다면 위 코드에서 에러가 발생함. 왜냐하면 이 언어들은 Nominal 타입 시스템을 이용하기 때문.

/**
 * 위와 같은 코드가 타입스크립트에서 정상적으로 동작하는 이유?
 * 
 * 자바스크립트의 작동 방식과 관련이 있음.
 * 기본적으로 자바스크립트는 객체 리터럴이나 익명 함수등을 사용하기 때문에 명시적으로 타입을 지정하는 것보다는
 * 코드의 구조 관점에서 타입을 지정하는 것이 더 잘 어울린다. (자바스크립트는 함수도 객체임. 일급 객체. 일급 함수. 함수를 일급 객체처럼 취급.)
 * 
 * 자바스크립트 함수가 일급 객체이기 때문에 할 수 있는 것.
 * 
 * - 콜백 패턴 사용 가능
 * - 고차함수 (High-order function) 만들 수 있음.
 * - 자바스크립트의 closure를 사용해 currying 과 memoization이 가능.
 * 
 * * 메모이제이션은 속도면에서 큰 이점이 있지만 속도를 위해 많은 메모리 사용량이 소비됨. 리엑트의 메모 기능 생각난다.
 */

/**
 * 구조적 타이핑 예시
 * 
 * 구조적 타이핑(structural typing)이란 코드 구조 관점에서 타입이 서로 호환되는지의 여부를 판단하는 것이다.
 * 
 */
interface City {
    name: string;
}

let somewhere: City;
let capital = { name: "Seoul", nation: "South-Korea" }
somewhere = capital; // 문제 없는 이유는 capital의 속성 중에 name이 있기 때문. City 인터페이스의 name 속성과 구조적으로 일치하여 타입이 호환됨.

function travel(a: City) { // 함수를 호출할 때에도 마찬가지이다.
    console.log("여기 경치 좋네", a.name);
}
travel(capital); // capital 변수에 이미 name 속성 뿐만 아니라 nation 속성도 있기 때문에 travel 함수의 호출 인자로 넘길 수 있다.

// Soundness 란?
// 타입스크립트는 컴파일 시점에 타입을 추론할 수 없는 특정 타입에 대해서 일단 안전하다고 보는 특성이 있다.
// 이걸 "들리지 않는다(it is said to not be sound)"라고 표현한다.

// Enum 타입 호환 주의 사항 - 이넘 타입은 number 타입과 호환되지만 이넘 타입끼리는 호환되지 않는다.
enum Status { Ready, Waiting }; // 값은 0, 1 할당됨.
enum Color { Red, Green, Blue }; // 초기 값을 주지 않아 숫자형 이넘이고 값들은 0 부터 차례대로 1씩 증가 0, 1, 2

let current_status = Status.Ready;
current_status = Color.Green; // 에러 발생 - 숫자 값이 같더라도 이넘 타입끼리는 호환이 되지 않는다!

/**
 * Class 타입 호환 주의 사항
 * 
 *  클래스 타입은 클래스 타입끼리 비교할 때 스태틱 멤버(static member)와 생성자(constructor)를 제외하고 속성만 비교합니다.
 * 
 */
class Violin {
    constructor(name: string, quantity: number) {
        // ...
    }
    name: string;
    size: { width: number, height: number };
}

class Viola {
    constructor(name: string) { 
        // ... 
    }
    name: string;
    size: { width: number, height: number };
}

let c: Violin;
let d: Viola;

c = d; // -> OK
d = c; // -> 마찬가지로 에러발생하지 않음.

const f = (instrument: Viola): void => { console.log(instrument.size.width); };

let c2 = f(new Viola('test'));
c2 = f(new Violin('test', 1)); // 비올라 대신 바이올린이 들어갔어도 에러나지 않음! 왜냐면 name 속성과 size 속성이 동일하기 때문.
// 단, 생성자 부분에 quantity는 number로 넘겨줘야함.

const f2 = (instrument: Violin): void => { 
    console.log(instrument.size.width);
    console.log(instrument.name);
};
let d2 = f2(new Violin('test2', 2));
d2 = f2(new Viola('test2')); // 들어가는건 비올라이지만 에러나지 않음. 속성 비교에 따른 타입 호환. 구조적 타이핑.

/**
 * Generics
 * 
 * 제네릭은 제네릭 타입 간의 호환 여부를 판단할 때 타입 인자 <T>가 속성에 할당 되었는지를 기준으로 한다.
 *
 */
interface Empty<T> {
}
let first: Empty<number>;
let second: Empty<string>;

first = second; // OK, because second matches structure of x

// 인터페이스 Empty는 일단 속성(member 변수)이 없기 때문에, first와 second 변수는 같은 타입으로 간주됩니다.
// 그런데 만약 아래와 같이 인터페이스 속성에 있어서 제네릭의 타입 인자가 속성에 할당된다면 이야기가 달라집니다.
interface NotEmpty<T> {
    data: T;
}
let third: NotEmpty<number>;
let fourth: NotEmpty<string>;

third = fourth; // Error, because third and fourth are not compatible - number 타입과 string 타입이므로 양립(호환)될 수 없음.
// 인터페이스 NotEmpty에 넘긴 제네릭 타입 <T>이 data 속성에 할당되었으므로 third와 fourth는 서로 다른 타입으로 간주됩니다.