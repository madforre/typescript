/**
 * 타입스크립트에서의 함수는 크게 다음 3가지로 구분되며 타입을 정의할 수 있다
 * * 함수의 파라미터(매개변수) 타입
 * * 함수의 반환 타입
 * * 함수의 구조 타입
 */

// 함수의 기본적인 타입 선언 - 매개변수와 함수의 반환 값에 타입을 추가
function sub(a:number, b:number): number { // 함수의 반환 값에 타입을 정하지 않을 때는 void라도 사용
    return a - b;
};

/**
 * 타입스크립트에서는 함수의 인자를 모두 필수 값으로 간주.
 * 함수의 매개변수를 설정하면 undefined나 null 이라도 인자로 넘겨야 함
 * 컴파일러에서는 정의된 매개변수 값이 넘어 왔는지 확인함
 * 달리 말하자면 정의된 매개변수 값만 받을 수 있고 추가로 인자를 받을 수 없다는 의미
 */

// 함수의 인자
sub(20, 10); // 10
sub(20, 10, 5); // 에러 발생 (정의된 파라미터 보다 더 넘어옴)
sub(10); // 마찬 가지로 에러 발생 (정의된 파라미터 보다 적게 넘어옴)

// 함수의 인자 - 매개변수의 갯수 만큼 인자를 넘기지 않아도 되는 방법은 "?"를 이용하는 것
const sub_2 = (a: number, b?: number): number => {
    return a - b;
};

sub_2(10, 10); // 100
sub_2(20, 10, 5); // 에러 발생 (정의된 파라미터 보다 더 넘어옴)
sub_2(10); // 타입 에러 없음

// 함수의 인자 - 매개변수 초기화 (es6 문법과 동일)
const sub_3 = (a: number, b: number = 10): number => {
    return a - b;
};

sub_3(20, undefined); // 10
sub_3(30, 20, 10);
sub_3(20); // 20

// REST 문법이 적용된 매개변수 - 여러개의 파라미터를 배열의 형태로 받아서 사용이 가능한 문법
const sub_5 = (a: number, ...nums: number[]): number => {
    let totalOfNums = 0;
    for (let key in nums) {
        totalOfNums += nums[key];
    }
    return a - totalOfNums;
};
sub_5(50, 25, 5);

// this - 타입스크립트에서 자바스크립트의 this가 잘못 사용되었을 때 감지 가능
interface testType {
    member: string;
}
function testThis(this: testType) {
    // 이런 식으로 사용
};

interface Vue {
    el: string;
    count: number;
    init(this: Vue): () => {}; // 타입스크립트에서 this가 가리키는 것을 명시
}

let vm: Vue = {
    el: '#app',
    count: 10,
    init: function(this: Vue) {
        return () => {
            return this.count;
        }
    }
} 

let getCount = vm.init();
let count = getCount();
console.log(count); // 10
// 위 코드들을 타입스크립트로 컴파일 했을 때 만일 --noImplicitThis 옵션이 있더라도 에러가 발생하지 않음.

/**
 * 콜백에서의 this - 앞에서 살펴본 일반적인 상황에서의 this와는 다르게 
 * 콜백으로 함수가 전달되었을 때의 this를 구분해줄 수 있음. 강제할 수 있음.
 */
interface UIElement {
    // 아래 함수의 `this: void` 코드는 함수에 `this` 타입을 선언할 필요가 없다는 의미입니다.
    onClick: (this: void, e: Event) => void;
}

class Handler implements UIElement {
    type: string;
    onClick(this: Handler, e: Event) {        
        this.type = e.type; // 위의 `UIElement` 인터페이스의 스펙에 `this`가 필요없다고 했지만 사용했기 때문에 에러가 발생합니다.
    }
}

class Handler_2 implements UIElement {
    type: string;
    onClick(this: void, e: Event) {        
        // `this`의 타입이 void이기 때문에 여기서 `this`를 사용할 수 없습니다.
        console.log('clicked!');
    }
}

let handler = new Handler();
let handler_2 = new Handler();
