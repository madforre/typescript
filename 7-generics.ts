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