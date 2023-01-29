/**
 * 인터페이스 - 상호 간에 정의한 약속 혹은 규칙을 의미. (객체지향 프로그래밍에선 설명서, 명세서.. 함수가 일급 객체인 자바스크립트에서는 놀랍게도 인터페이스를 함수에도 사용이 가능하다. )
 * 
 * 타입스크립트에서의 인터페이스는 보통 다음과 같은 범주에 대해 약속을 정의할 수 있음.
 * 
 * * 객체의 스펙 (속성과 속성의 타입)
 * * 함수의 파라미터
 * * 함수의 스펙 (파라미터, 반환 타입 등)
 * * 배열과 객체를 접근하는 방식
 * * 클래스
 */

// 인터페이스 맛보기
let person = { name: 'madforre', age: 30 };

function logAge(obj: { age: number }) { // age를 속성으로 갖는 객체를 인자로 받도록 하였음. 인자 타입 뿐만 아니라 객체의 속성 타입도 정의 가능
    console.log(obj.age); // 30
}
logAge(person); // 30

interface personAge {
    age: number;
}

function logAge2(obj: personAge) { // 인터페이스를 적용하면 함수의 인자가 좀 더 명시적으로 바뀜
    console.log(obj.age);
}
let person_2 = { name: 'j', age: 20 }; // 정의된 속성, 타입의 조건만 만족한다면 객체의 속성 갯수가 더 많아도 상관 없음. 또한 인터페이스에 선언된 속성 순서 지키지 않아도 됨.
logAge2(person_2);

let person_3 = { name: 'test', sex: 'man' };
logAge2(person_3); // age는 필요함. 인터페이스에 해당하는 age 속성이 없어 에러 발생.

// 옵션 속성 - 인터페이스에 정의되어 있는 속성을 꼭 모두 다 사용하지 않아도 되는 방법
interface testInterface { // 예시
    member?: any;
} // 이처럼 속성의 끝에 ? 를 붙이면 된다.

interface CraftBeer {
    name: string;
    hop?: number;
}

let myBeer = {
    name: 'Saporo'
};

function brewBeer(beer: CraftBeer) {
    console.log(beer.name); // Saporo
}
brewBeer(myBeer); // 객체 myBeer의 속성에 hop이 없음. 그래도 잘 동작하는 이유는 hop을 option property로 선언했기 때문.

// 옵션 속성의 장점 - 인터페이스 사용시 속성을 선택적으로 적용 가능 & 인터페이스에 정의되어 있지 않은 속성에 대해서 인지시켜줄 수 있음.
function brewBeer_2(beer: CraftBeer) {
    console.log(beer.taste); // 에러 발생
}

// 읽기 전용 속성 - 인터페이스로 객체를 처음 생성할 때만 값을 할당하고 그 이후에는 변경 할 수 없는 속성을 의미.
interface CraftBeer_2 {
    readonly brand: string; // readonly를 property 앞에 붙여 사용함.
}

let myBeer_2: CraftBeer_2 = {
    brand: 'Korean Sujae Beer'
};
myBeer_2.brand = 'Korean Carpenter'; // 인터페이스로 객체를 선언하고 나서 readonly인 property를 수정하려고 하면 에러가 발생한다.

/**
 * 읽기 전용 배열
 * 
 * * 배열을 선언할 때 ReadonlyArray<T> 타입을 사용하면 읽기 전용 배열 생성 가능
 * * 선언하면 배열의 내용을 변경할 수 없음. 선언하는 시점에만 값 정의 가능하므로 주의해서 사용.
 */
let test_arr: ReadonlyArray<number> = [1, 2, 3];
let test_arr2: readonly number[] = [1, 2, 3];
test_arr.splice(0, 1); // error
test_arr.push(4); // error
test_arr[0] = 100; // error
test_arr_2.push(7); // error

// 객체 선언과 관련된 타입 체킹 - 옵션 속성임에도 불구하고 비슷한 이름의 속성이 있어 오탈자 점검으로 인해 에러가 나는 경우를 무시할 수 있음.
function makeBrewBeer(beer: CraftBeer) {
    console.log(beer.name); // Saporo
}
makeBrewBeer({ name: 'some beer', hope: 1 }); // 타입스크립트는 인터페이스를 이용하여 객체를 선언할 때 좀 더 엄밀한 속성 검사를 진행함. 현재는 옵션 속성인데도 이름이 비슷해서 에러가 나고 있음.

let myBeer_3 = { name: 'the beer', hope: 2 };
makeBrewBeer(myBeer_3 as CraftBeer); // 오탈자 점검 타입 추론을 무시하고 싶다면 as를 활용하여 선언하면 된다.
makeBrewBeer({ name: 'the beer', hope: 2 } as CraftBeer); // 인자에 바로 객체를 선언해도 가능.

// 인터페이스에 정의하지 않은 속성들을 추가로 사용하고 싶을 때는 아래와 같은 방법 사용
interface CraftBeer_3 {
    brand?: string;
    [propName: string]: any;
}
function brewBeer_3(beer: CraftBeer_3) {
    console.log(beer.brandon); 
}

// 함수 타입 - 인터페이스는 함수의 타입을 정의할 때에도 사용할 수 있음.
interface login {
    (username: string, password: string): boolean;
}

let loginUser: login;
loginUser = (id: string, pw: string) => {
    console.log("로그인 했습니다");
    return true;
};

let loginUser_2: login = (id, pw) => {
    console.log("로그인 했습니다");
    return true;
};
loginUser_2("test_id", 2);

let loginUser_3: login = function(id, pw) {
    console.log("로그인 했습니다");
    return true;
};
loginUser_3(777, "test_pw");

// 클래스 타입 - C#이나 자바처럼 타입스크립트에서도 클래스가 일정 조건을 만족하도록 타입 규칙을 정할 수 있음.
interface CraftBeer_4 {
    beerName: string;
    nameBeer(beer: string): void;
}

class myBeer_4 implements CraftBeer_4 {
    beerName = 'Baby Guinness';
    nameBeer(b: string) { // b도 타입 지우면 any로 추론되어 메소드가 오버라이딩 됨. string으로 강제해주려면 명시해줘야 하는듯.
        this.beerName = b;
        return true; // 오버라이드 되므로 타입추론에 의해 리턴 값의 타입이 boolean이 되어버렸다..!
    }
    constructor() {}
}

const test_beer = new myBeer_4();
test_beer.nameBeer(4);
test_beer.nameBeer("test name");

// 인터페이스 확장 - 클래스와 마찬가지로 인터페이스도 인터페이스 간 확장이 가능. & 여러 인터페이스를 상속받아 사용이 가능.
interface Person {
    name: string;
}
interface Developer extends Person {
    skill: string;
    free_use?: boolean;
}
let fe = {} as Developer; // Developer 인터페이스를 이행하는 객체를 fe 변수에 할당.
fe.name = 'reggie';
fe.skill = 'TypeScript';

let fe2: Developer; // 이렇게도 인터페이스 사용 가능한듯.
fe2.name = "test";

interface Drinker extends Person {
    drink: string;
}
interface Developer extends Drinker { // 여러 인터페이스를 상속 받아 사용 가능.
    skill: string;
}
let fe3 = {} as Developer;
fe3.name = 'gosu';
fe3.skill = 'TypeScript';
fe3.drink = 'Beer';

/**
 * 하이브리드 타입
 * 
 * 자바스크립트의 유연하고 동적인 타입 특성에 따라 인터페이스 역시 여러 가지 타입을 조합하여 만들 수 있음.
 * 다음과 같이 함수 타입이면서 객체 타입을 정의할 수 있는 인터페이스가 있음.
 * 
 */
interface CraftBeer_5 {
    (beer: string): string;
    brand: string;
    brew(): void;
}

function myBeer_5(): CraftBeer_5 {
    let my = ((beer: string) => {}) as CraftBeer_5;
    my.brand = 'Beer Kitchen';
    my.brew = function() {};
    return my;
}

let testBrewedBear = myBeer_5();
testBrewedBear('My First Beer');
testBrewedBear.brand = 'Some Craft';
testBrewedBear.brew(); // 함수도 객체고 객체도 함수니깐.. 자바스크립트가 일급 객체 프로그래밍이니깐 가능한 것이라고 생각한다.

/**
 * 클래스를 상속 받는 인터페이스도 경우에 따라 사용하는 듯 하나 개념이 혼동될 수 있어 추후 살펴볼 예정. 인터페이스 끝.
 */