//module화를 한 순간 두 파일은 서로 접근할 수 없는 상태가 된다.

//export default는 무조건 이 함수를 import하게 되면 기본으로 적용.
export default function add(a, b) {
  return a + b
}

//한 파일 내에서 export defualt는 하나.
//나머지는 export
export function print() {
  console.log('Now Printing...🚥')
}
