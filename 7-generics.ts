/**
 * 제네릭 (Generics) 의 사전적 정의.
 * 
 * 재사용성이 높은 컴포넌트 만들때 자주 활용되는 특징
 * 한가지 타입보다 여러 가지 타입에서 동작하는 컴포넌트를 생성하는데 사용
 * 
 * 객체지향에서의 제네릭.
 * 
 * 제네릭(generic)이란 데이터의 타입(data type)을 일반화한다(generalize)는 것을 의미합니다. 
 * 제네릭은 클래스나 메소드에서 사용할 내부 데이터 타입을 컴파일 시에 미리 지정하는 방법
 * 
 */

// 제네릭의 한 줄 정의와 예시 - 제네릭이란 타입을 마치 함수의 파라미터처럼 사용하는 것을 의미한다.
function getText(text: any) {
    return text; // 어떤 값이 들어가도 그대로 반환된다.
}

function getTxt<T>(txt: T): T { // 제네릭 기본 문법이 적용된 형태.
    return txt;
}
getTxt<string>('hi'); // 함수를 호출할 때 함수 안에서 사용할 타입을 넘겨줄 수 있음.

// function getTxt<string>(text: T): T {
//     return text;
// } // 함수 호출시 제네릭은 이와 같이 동작한다. 이렇게 타입을 정의한 것과 같이 된다.

getTxt<number>(10);
getTxt<boolean>(true); // 제네릭은 타입을 동적으로 생성할 수 있게 해주는구나..!

// 제네릭을 사용하는 이유
function echoText(text: any): any { // 제네릭 사용 x. any라는 타입은 타입 검사를 하지 않음.
    return text;
}
echoText(10); // 함수에 어떤 값이 반환되는지는 알 수가 없음.

function echoText2<T>(text: T): T { // 제네릭 사용 O.
    return text;
} // 함수 호출시 넘긴 타입에 대해 타입스크립트가 추정할 수 있게됨.

// 제네릭 사용된 함수 호출. 타입을 동적으로 생성.
// #1
let text = echoText2<string>("Hello Generic"); // 함수의 인자로 어떤 타입이 들어갔는지 좀더 명시적.
// #2
text = echoText2("Hello Generic"); // 짧고 가독성이 좋기 때문에 흔히 사용됨.
// 복잡한 코드에서 #2코드로 타입 추정이 되지 않는다면 #1 방법을 사용하면 된다.

// 제네릭 타입 변수
function logText2<T>(text: T): T { // 함수를 호출하기 전에는 받는 T 타입이 뭔지 모름.
    console.log(text.length); // 컴파일러에서 에러 발생 - 인자에 타입을 넣어달라고 경고함. text에 .length가 있다는 단서가 없기 때문. ex) number가 넘어오면 안됨.
    return text;
}

function logText3<T>(text: T[]): T[] {
    console.log(text.length); // 제네릭 타입이 배열이기 때문에 `length`를 허용함.
    return text;
}
logText3([1, 2, 3]); // 파라미터에 [1, 2, 3] 처럼 숫자로 이뤄진 배열을 받으면 타입 반환 값으로 number를 돌려줌.
logText3(["1", "2", 3]); // 제네릭을 사용하면 이런 식으로 받는 파라미터에 따라 함수의 타입을 유연하게 정의해줄 수 있음.
logText3(["1", "2", "3"]); // 넘어간 인자가 string으로 이루어진 배열. 따라서 타입값으로 string을 받음.

// 좀 더 명시적으로 제네릭 타입 선언하기
function logText4<T>(text: Array<T>): Array<T> {
    console.log(text.length);
    return text;
}

// 제네릭 타입 사용
function logTextNormalFunc<T>(text: T): T {
    return text;
}

// #1
let doSomething: <U>(text: U) => U = logTextNormalFunc;
doSomething<boolean>(false);

let bool: <U>(text: U) => U = logTextNormalFunc; // 타입 생성 시점을 함수 호출 시점으로 미루고 싶을 때 제네릭을 한번 더 써줌. (데코레이션 패턴 같음.)
bool<boolean>(true); // 변수 할당 시점이 아니라 함수 호출 시점에 타입을 동적으로 선언하였음.

// #2
const logTextArrowFunc = <T>(text: T): number => 2;

let doSomething2: <T>(text: T) => number = logTextArrowFunc; // 변수 할당 시점에 리턴될 타입만 선언했음. 제네릭을 함수의 형태로 선언하여 타입 체킹함.
doSomething2<string>("test"); // 함수 호출 시점에 함수 내부에 사용될 타입을 동적으로 선언. (제네릭 타입 사용.)
doSomething2<number>(0); // 함수 호출 시점에 함수 내부에 사용될 타입을 동적으로 선언. 
// 타입파라미터를 뭐로 하던 어차피 리턴값은 number 타입으로 정해진 2임.

// #3
let makeYourTypeAndValue = <T>(text: T): T => text;
makeYourTypeAndValue<number>("test"); // 리턴하는 타입도 함수 호출 시점에 동적으로 생성됨. 리턴 타입 불일치시 에러 발생.

// #4
let makeYourTypeAndValue2: {<T>(text: T): T} = logTextNormalFunc; // 객체로 제네릭을 한번 더 선언하여 타입 체킹. 타입 생성 시점을 함수 호출시로 미룸.
makeYourTypeAndValue2<string>(777); // 리턴하는 타입도 함수 호출 시점에 동적으로 생성됨. 리턴 타입 불일치시 에러 발생.
makeYourTypeAndValue2<string>("i got it");

// 제네릭 인터페이스 코드
interface GenericLogTextFn {
    <T>(text: T): T; // 타입 인자를 인터페이스안에서 사용했네.
}
function logTextfunc<T>(text: T): T {
    return text;
}
let myString: GenericLogTextFn = logTextfunc;
myString<string>("test");
myString<number>("test"); // 에러
myString<number>(7);

// 제네릭 인터페이스 코드에서 인터페이스에 타입 인자를 강조하고 싶은 경우
interface GenericLogTextFn2<T> { // 타입 인자를 밖에다 뺌.
    (text: T): T;
}
// function logTextfunc2<T>(text: T): T {
//     return text;
// }
const logTextfunc2 = <T>(text: T): T => text;
let myString2: GenericLogTextFn2<string> = logTextfunc2;
myString2("test");
myString2(0); // 에러
myString2<number>(2); // 에러. 인터페이스를 이용해 타입을 동적으로 이미 생성했음.
myString2<string>("test"); // 마찬가지로 에러. 인터페이스를 이용해 제네릭 이미 사용했음.
// 다만, 이넘(enum)과 네임스페이스(namespace)는 제네릭으로 생성 불가능.
// 이와 같은 방식으로 제네릭 인터페이스 뿐만 아니라 클래스도 생성할 수 있음. 

// 제네릭 클래스
class GenericMath<T> { // 제네릭 클래스 선언시 클래스 이름 오른쪽에 <T>를 붙여준다.
    pi: T;
    sum: (x: T, y: T) => T; // 함수 형태로 제네릭 사용함.
    // sum: {(x: T, y: T): T}; 객체 형태로도 제네릭 사용 가능
}
let math = new GenericMath<number>(); // 해당 클래스로 인스턴스를 생성할 때 타입에 어떤 값이 들어갈지 지정하면 된다.
math.sum = (a, b) => a + b;
let value = math.sum(10, 30); // 컴파일 후 자바스크립트 실행하면 value 변수에 40이 담기는 것을 확인 가능.
// * 제네릭 클래스는 정적인 측면이 아닌 인스턴스화된 측면 쪽에서 타입을 생성한다. - 뭐.. 타입이 생성되는 평가시점이 객체 생성시니깐..
// - 따라서 정적 멤버를 클래스 타입 파라미터로 사용하는 것은 불가능!

/**
 * 제네릭 제약 조건 (Generic constraints)
 */
interface Constraint { // 제네릭 타입 변수에서 살펴본 내용 말고도 제네릭 함수에 length 속성 허용하는 방법 있음.
    length: number
}

function testLogText<T extends Constraint>(text: T): T { // extends 키워드로 표현한 인터페이스를 이용, 제약사항 명시.
    console.log(text.length); // 타입에 대한 강제는 아니지만 length에 대해 동작하는 인자만 넘겨받을 수 있음.
    return text;
}

testLogText(10); // 타입이 number인 10에는 length 속성이 없으므로 에러 발생.
testLogText(true); // 타입이 boolean인 true에는 length 속성이 없으므로 에러 발생.
testLogText({ length: 0, value: 'hi' }); // 객체의 속성 접근과 같이 동작하므로 오류 없음 (제약사항에도 length 속성이 있고 넘겨받는 객체에도 있기 때문.)
testLogText([1, 2, 3, 4]); // 넘겨받은 배열 객체에는 length 속성이 있음. 속성 접근과 같이 동작하므로 오류 없음

// 객체의 속성을 제약하는 방법 - 두 객체를 비교할 때도 제네릭 제약 조건을 사용할 수 있음.
function getProperty<T, O extends keyof T>(obj: T, key: O) {
    return obj[key];
}
let obj = { a: 1, b: 2, c: 3 };

getProperty(obj, "a"); // okay
getProperty(obj, "z"); // 에러 발생. "z"는 "a", "b", "c"에 해당하지 않습니다.

// 제네릭을 선언할 때 <O extends keyof T> 부분을 살펴보면 해당 함수의 첫 번째 인자로 받는 객체에서
// 그 객체에 없는 속성들은 접근할 수 없게끔 제한하였음을 알 수 있다.