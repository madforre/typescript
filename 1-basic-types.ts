/**
 * 
 * Type Annotation 이란?
 * 
 * : 를 이용하여 자바스크립트 코드에 타입을 정의하는 방식
 * 
 */

// String
let str: string = "hi";

// Number
let num: number = 10;

// Boolean
let isLoggedOut: boolean = true;

/**
 * 객체지향 프로그래밍
 * 
 *  제네릭(generic)이란 데이터의 타입(data type)을 일반화한다(generalize)는 것을 의미합니다.
 *  제네릭은 클래스나 메소드에서 사용할 내부 데이터 타입을 컴파일 시에 미리 지정하는 방법
 * 
 * 함수형 프로그래밍
 * 
 *  제네릭이란 타입을 마치 함수의 파라미터처럼 사용하는 것
 */

// Object - Array
let arr: number[] = [1, 2, 3];
let arr_2: Array<number> = [1, 2, 3]; // 제네릭 사용

// Object - Tuple (배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식)
let arr_3: [string, number] = ["hi", 10];
arr_3[1].concat("!"); // 정의하지 않은 타입, 인덱스로 접근할 경우 오류 나타남
arr_3[5] = "hello"; // 마찬가지로 오류 발생

// Enum - 특정 값(상수)들의 집합을 의미
enum Fruit { Apple, Banana, Grape }
let basket: Fruit = Fruit.Apple;

/**
 * Any - 기존 자바스크립트로 구현된 코드에 타입스크립트를 점진적으로 적용할 때 활용하면 좋은 타입
 * 단어 그대로 모든 타입에 대해서 허용한다는 의미를 가지고 있음
 */
let str_2: any = "hi";
let num_2: any = 10;
let arr_4: any = ["a", 2, true];

// Void - 변수에는 undefined와 null 만 할당되고 함수에는 반환 값을 설정할 수 없는 타입
let unuseful: void = undefined;
let unuseful_2: void = null;
const notuse = (): void => {
    console.log('sth');
};

// Never - 함수의 끝에 절대 도달하지 않는다는 의미를 지닌 타입
const neverEnd = (): never => {
    while (true) {

    };
};