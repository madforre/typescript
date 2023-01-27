// 이넘(Enums) - 특정 값들의 집합을 의미하는 자료형 ex) 나이키, 아디다스, 뉴발란스 같은 신발 브랜드 목록이 이넘이 될 수 있음.
// 타입스크립트에서는 문자혐 이넘과 숫자형 이넘을 지원함. (이넘은 서로 연관된 상수들의 집합을 의미)

// 숫자형 이넘
enum Direction {
    Up = 1,
    Down, // 2
    Left, // 3
    Right // 4
}
// 위와 같이 숫자형 이넘을 선언할 때 초기 값을 주면 초기 값부터 차례로 1씩 증가함.

// 숫자형 이넘 - 초기 값 주지 않았을 경우 0부터 차례대로 1씩 증가
enum Direction_2 {
    Up, // 0
    Down, // 1
    Left, // 2
    Right // 3
}

// 숫자형 이넘 사용하기
enum DataResponse {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: DataResponse): void { // 이넘도 타입 어노테이션 및 타입힌팅 가능.
    // ...
}

respond("madforre", DataResponse.Yes); // 선언한 이넘은 이렇게도 사용 가능.

const getSomeValue = () => 7;
enum Wrong {
    A = getSomeValue(),
    B, // Error, 초기화가 필요합니다. - 이넘 멤버에는 꼭 초기화가 필요함.
}

// 문자형 이넘 - 문자형 이넘은 이넘 값 전부를 특정 문자 또는 다른 이넘 값으로 초기화 해줘야 한다.
enum Direction_3 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
} // 문자형 이넘에는 숫자형 이넘과는 다르게 auto-incrementing이 없음.

// 복합 이넘 (Heterogeneous Enums) - 여러 다른 종류로 이루어진 이넘. 기술적으로 이넘에 문자와 숫자를 혼합하여 생성할 수 있음. 하지만 권고되지 않음.
// 최대한 같은 타입으로 이루어진 이넘을 사용할 것.
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// 런타임 시점에서의 이넘 특징 - 이넘은 런타임시에 실제 객체 형태로 존재한다.
enum E {
    X, Y, Z // 초기 값 안주었으므로 숫자형 이넘. 0, 1, 2 가 각각 할당됨.
}

function getX(obj: { X: number }) {
    return obj.X;
}
getX(E); // 이넘 E의 X는 숫자형 이넘 (초기 값 안줬으므로)이기 때문에 정상 동작.

// 컴파일 시점에서의 이넘 특징 - 런타임 시점에서는 실제 객체지만 컴파일 시점에서는 keyof를 사용할 때 주의해야 한다. 
// (keyof는 Object의 key 값들을 가져오고 싶을 때 사용. typeof는 값을 타입으로 쓰고 싶을 때 사용. 
// 자바스크립트 값은 type으로 쓸 수 없기 때문에 typeof가 먼저 붙는 것.)
// 일반적으로 keyof를 사용해야 하는 상황에서는 keyof typeof 를 사용하자.
enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}

// 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'; - 합타입 또는 튜플 타입 사용시에는 type alias 사용 권장, 그 외에는 interface 사용함.
type LogLevelStrings = keyof typeof LogLevel; // typeof 없으면 에러 발생함. 

function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
       console.log('Log level key is: ', key);
       console.log('Log level value is: ', num);
       console.log('Log level message is: ', message);
    }
}
printImportant('ERROR', 'This is a message');

// 리버스 매핑(Reverse Mapping)
// 리버스 매핑은 숫자형 이넘에만 존재하는 특징이다. 이넘의 키(key)로 값(value)을 얻을 수 있고 값(value)로 키(key)를 얻을 수도 있다.
enum Enum {
    A
}
let a = Enum.A; // 키로 값을 획득하기
let keyName = Enum[a]; // 값으로 키를 획득하기
// 위와 같은 리버스 매핑은 문자형 이넘에는 존재하지 않는다.
