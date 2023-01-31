/**
 * 타입 별칭 (Type Aliases)
 * 
 *  타입 별칭은 특정 타입이나 인터페이스를 참조할 수 있는 타입 변수를 의미한다.
 * 
 */
// string 타입을 사용할 때.
const my_name: string = "me"; 

// 타입 별칭을 사용할 때.
type MyName = string;
const my_name2: MyName = "me2";

// 위와 같이 string, number와 같은 간단한 타입 뿐만 아니라 interface 레벨의 복잡한 타입에도 별칭을 부여할 수 있다.
type Christian = {
    name: string;
    skill: string;
}

// 또한 타입 별칭에 제네릭도 사용이 가능하다.
type Good<T> = {
    name: T
}

/**
 * 타입 별칭의 특징
 * 
 *  타입 별칭은 새로운 타입 값을 하나 생성하는 것이 아니라 
 *  정의한 타입에 대해 나중에 쉽게 참고할 수 있게 이름을 부여하는 것과 같다.
 * 
 */
interface Engineer {
    name: string;
    skill: string;
}
let some_man: Engineer; // 인터페이스로 선언한 타입을 프리뷰로 확인하면 인터페이스가 표시된다.

type Engineer2 = {
    name: string;
    skill: string;
}
let some_man2: Engineer2; // 타입 별칭으로 선언한 타입을 프리뷰로 확인하면 특정 타입을 참조하는 타입 변수인 타입 별칭이 표시된다.

/**
 * type vs interface
 * 
 *  타입 별칭과 인터페이스의 가장 큰 차이점은 타입의 확장 가능 / 불가능 여부이다.
 *  인터페이스는 확장이 가능한 반면에 타입 별칭은 확장이 불가능하다.
 * 
 *  따라서 가능한한 type 보다는 interface로 선언해서 사용하는 것을 추천한다.
 * 
 *  * 좋은 소프트웨어는 언제나 확장이 용이해야 한다는 원칙에 따라, 가급적 확장이 가능한 인터페이스로 선언하는 것이 좋다!
 * 
 */