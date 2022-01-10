{
  //1. JavaScript 💩
  //num1, num2에는 number일 수도 있지만 string일 경우 문자열을 이어주는 기능을 하게 된다.
  function jsAdd(num1, num2) {
    return num1 + num2
  }

  //1. Typescript ✨
  function Add(num1: number, num2: number): number {
    return num1 + num2
  }

  //2. JavaScript 💩
  // function jsFetchNum(id) {
  //   //code ...
  //   //code ...
  //   return new Promise((resolve, reject)) => {
  //     resolve(100)
  //   }
  // }

  //2. TypeScript ✨
  function FetchNum(id: string): Promise<number> {
    //code ...
    return new Promise((resolve, reject) => {
      resolve(100)
    })
  }

  // JavaScript ✨ => TypeScript 유용한 최신 JavaScript 문법은 TypeScript에서 활용 가능하다
  // Optional parameter
  function printName(firstName: string, lastName?: string) {
    console.log(firstName)
    console.log(lastName)
  }
  printName('Steve', 'Jobs')
  printName('Skylar')
  printName('Anna') //('Anna', undefined) Optinal parameter의 경우에는 undefined를 작성하지 않아도 args가 undefined 로 전달 된다.

  //Default parameter
  function printMessage(message: string = 'default message') {
    console.log(message)
  }
  printMessage() //아무런 message를 입력하지 않아도 default parameter로 등록한 default message가 출력된다.

  //Rest parameter
  function addNumber(...number: number[]): number {
    return number.reduce((a, b) => a + b)
  }
  console.log(addNumber(1, 2))
  console.log(addNumber(1, 2, 3, 4))
  console.log(addNumber(1, 2, 3, 4, 5))
}
