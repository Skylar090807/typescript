import add, { print as printing } from './10-3-module1.js'
/*
export default를 import할 때는 그냥 가져오고, default가 아닌 export를 가져올 땐
{} 안에 작성해 import 한다.
export default로 받아 온 함수는 내가 원하는 아무 이름으로 정의할 수 있다.
일반 export로 받아 온 함수의 이름을 바꿀 때는 원래 함수 이름 뒤에 as를 붙여 이름을 바꿀 수 있다.
*/
/*
export default를 쓰지 않고 모든 함수나 변수가 일반 export로 되어 있다면
import * from '파일경로'
다른 이름으로 바꿔 import하고 싶다면
import * as 다른이름 from '파일경로'
*/

console.log(add(1, 2))
// console.log(window.add(4, 5)) //module화 전에는 접근 가능, module화 후에는 window 접근 불가.

printing()
