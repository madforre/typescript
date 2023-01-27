// readonly - 접근만 가능
class Developer_3 {
    readonly name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}
let john = new Developer_3("John");
john.name = "John"; // error! name is readonly.

// Accessor
// 타입스크립트에서는 클래스로 생성한 객체의 특정 속성 접근, 할당 제어가 가능하다.
class Publisher {
    name: string;
}
const j = new Publisher();
j.name = 'Sponge Bob'; // j라는 객체의 name 속성은 이제 스폰지 밥이라는 값을 가짐.

// name 속성에 제약 사항을 추가하고 싶다면 아래와 같이 get과 set을 활용한다.
class Singer {
    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(newValue: string) {
        if (newValue && newValue.length > 5) {
            throw new Error('이름이 너무 깁니다');
        }
        this._name = newValue;
    }
}
const gh = new Singer();
gh.name = 'new singer';
gh.name = 'ns'; // get만 선언하고 set을 선언하지 않는 경우에는 자동으로 readonly로 인식됩니다. (set 메소드 선언한거 없애보면 에러 나옴.)

// Abstract Class - 추상 클래스는 특정 클래스의 상속 대상이 되는 클래스이며, 좀 더 상위 레벨에서 속성, 메서드의 모양을 정의함.
abstract class Tester {
    abstract testing(): void; // 'abstract'가 붙으면 상속 받은 클래스에서 무조건 구현해야 한다.
    talk(): void {
        console.log('talk sth');
    }
}

class FrontEndTester extends Tester {
    testing(): void {
        // Tester 클래스를 상속 받은 클래스는 무조건 testing 메서드를 정의, 이행해야 한다.
        console.log("test web");
    }
    reviewing(): void {
        console.log("review web");
    }
}
const tes = new Tester(); // 추상 클래스는 객체(인스턴스)를 생성할 수 없음.
const mhl = new FrontEndTester(); // 추상 클래스를 상속받은 클래스는 생성 가능.
mhl.testing();
mhl.talk();
mhl.reviewing();