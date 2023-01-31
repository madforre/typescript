// 타입 추론 (Type Inference) - 타입 추론이란 타입스크립트가 코드를 해석해 나가는 동작을 의미한다.

// 타입 추론의 기본
let x = 3; // x에 대한 타입을 따로 지정하지 않더라도 일단 x는 number로 간주됨. - 타입추론.
// 변수를 선언하거나 초기화 할 때 타입이 추론됨. 이외에도 변수, 속성, 인자의 기본 값, 함수의 반환 값 등을 설정할 때 타입 추론이 일어남.

/**
 * 가장 적절한 타입 (Best Common Type)
 * 
 * 보통 몇개의 표현식(코드를) 바탕으로 타입을 추론한다.
 * 표현식을 이용하여 가장 근접한 타입을 추론하게 되는데 이 가장 근접한 타입을 Best Common Type 이라고 한다.
 */
let checkArr = [0, 1, null]; // Best Common Type 알고리즘으로 다른 타입들과 가장 잘 호환되는 타입을 자동으로 선정함.

// 문맥상의 타이핑 (Contextual Typing) - 문맥상으로 타입이 결정됨. 코드의 위치(문맥)를 기준으로 추론이 일어나게됨.

// # 예시 1
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button); // <- OK
    console.log(mouseEvent.kangaroo); // <- Error!
}; // window.onmousedown에 할당되는 함수의 타입을 추론하기 위해 window.onmousedown 타입을 검사한다.
// 검사가 끝나면 함수의 타입이 마우스 이벤트와 연관이 있다고 추론하기 때문에 button 속성은 있으나, kangaroo 속성은 없다고 결론을 내린다.

// # 예시 2
window.onscroll = function(uiEvent) {
    console.log(uiEvent.button); // <- Error!
} // 함수가 window.onscroll에 할당되었기 때문에, 함수의 인자 uiEvent는 UIEvent로 간주된다.
// 즉 앞의 마우스 이벤트와는 다르게 button 속성이 없다고 추론한다.

// 문맥상 타이핑을 좀더 이해하기 위해 아래와 같이 코드를 바꿔보자.
const testHandler = (uiEvent) => { // --noImplicitAny 옵션을 사용하면 이부분은 에러남.
    console.log(uiEvent.button); // <- OK
}; // 앞의 예제와 동일하지만 함수가 할당되는 변수만으로는 타입을 추정하기 어렵다. 따라서 아무 에러가 나지 않는다.

/**
 * 객체지향 프로그래밍과 타입 계층
 * 
 * - 서브클래싱이란? 클래스의 코드를 재사용할 목적으로 상속을 사용하는 경우를 가리킴.
 * 
 * - 서브타입이란? 타입 계층을 구성하기 위해 상속을 사용하는 경우를 가리킴.
 * 
 */

/**
 * 타입스크립트의 타입 체킹
 * 
 * 타입 체킹에 있어서 타입스크립트의 지향점은 타입 체크는 값의 형태에 기반하여 이루어져야 한다는 점이다.
 * 이걸 Duck Typing 또는 Structural Subtyping 이라고 한다.
 * 
 * Duck Typing : 객체의 변수 및 메서드의 집합이 객체의 타입을 결정하는 것을 의미. 동적 타이핑의 한 종류
 * 
 * ex) 인터페이스를 수행하는 컴포넌트는 아니지만 속성과 메서드를 모두 가지고 있는 경우 타입 체크를 통과함.
 *     타입 스크립트의 타입 시스템은 '구조적으로' 타입이 맞기만 하다면 이를 허용해줌.
 * 
 * Structural Subtyping 
 * 
 *  객체의 실제 구조나 정의에 따라 타입을 결정하는 것을 의미한다.
 *  이름이 다르더라도 구조가 같으면 괜찮다.
 *  Ocaml, Haskell, Javascript는 Structural 타입 시스템을 이용
 *  대신 구조가 바뀌면 다른 타입으로 인식한다. (비교하는 두 클래스가 메소드 명이 같아도 파라미터 타입 형태가 달라진다면 다른 타입으로 인식.)
 * 
 * Nominal Subtyping 
 * 
 *  이름이 다를 경우 다른 타입이다.
 *  C++, Java와 같은 언어는 Nominal 타입 시스템을 이용한다. 
 *  예) 같은 속성, 메서드가 있어도 클래스 명이 다르면 다른 타입으로 인식한다.
 * 
 */