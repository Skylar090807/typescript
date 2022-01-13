{
  //Type Assertions 주장 💩
  //type을 100% 확신할 때만 사용할 것.

  function jsStrFunc(): any {
    return 'hello'
  }
  const result = jsStrFunc()

  // jsStrFunc: any 이지만 string type인 것을 확신하고, string type만 사용할 수 있는 length API를 사용하고 싶을 때
  //Type Assertions를 사용.

  //type assertions 사용 방법.
  //방법 1. as 키워드를 사용해 type을 casting한다.
  console.log((result as string).length)

  //방법 2. < > 안에 type을 명시해 casting 한다.
  console.log((<string>result).length)

  function jsStrFunc2(): any {
    return 2
  }
  const result2 = jsStrFunc2()
  console.log((result2 as string).length) //typescript에서 에러는 발생하지 않지만 console에는 undefinedf가 뜬다.

  const wrong: any = 5
  // console.log((wrong as Array<number>).push(1)) // 😱 error

  function findNumbers(): number[] | undefined {
    return undefined
  }

  const numbers = findNumbers()
  // numbers.push(2) // const numbers: number[] | undefined Object is possibly 'undefined'.
  //assertions 적용
  numbers!.push(1) // 100% 확신할 때 !로 assertions 사용. 😱
  numbers?.push(2) // assertions 와 반대 optional

  const button = document.querySelector('class')
  //lector<K extends Element = Element>(selectors: stirng): E | null
  // button.nodeValue //Object is possibly 'null'
  if (button) {
    //button이 있는 경우에는 nodeValue에 접근
    button.nodeValue
  }

  //assertions 적용
  const button2 = document.querySelector('class')! //button이 있다고 100% 확신할 때 사용
}
