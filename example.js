// @ts-check

/**
 * @typedef {object} User
 * @property {string} name
 * @property {string} email
 * @property {string} address
 */

/**
 * @returns {Promise<User>}
 */
// function fetchUser() {
//     return axios.get(url);
// }

/**
 * @param {number} a 첫번째 숫자
 * @param {number} b 두번째 숫자
 * @returns {number}
 */
// () => 2; // 이 함수를 주석 해제하면 아래 sum 함수에 타입 어노인팅이 적용됨. 그럼 코드가이드, 자동완성이 사용 가능.

var sum = function (a, b) {
    return a + b;
};
// sum(10, "st"); // ts-check 적용되었으므로 ts 파일처럼 js 파일에서도 에러 발생 체크 가능
var result = sum(10, 5);
result.toLocaleString(); // 위의 익명 함수를 주석으로 처리하면 vscode의 IntelliCode 작동, 주석 해제하면 작동 x