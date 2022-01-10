//module을 작성하지 않고 그냥 파일을 작성하면 모두 global scope로 책정 된다.
//다른 파일에서 이름이 충돌될 수 있다. {} 코드 블럭 안에서 작성하면 local scope로 책정 된다.

{
  //JavaScript

  //old: var (hoisting ... problem 💩)
  // var age = 5
  // age =1

  //let es6에서 도입
  let name = 'hello'
  name = 'hi'

  //const
  const age = 5
  // age = 5 //error
}
{
  //TypeScript

  //type 정의는 typescript와 javascript가 같다.
  //Primitive(원시 타입): number, string, boolean, bigint, symbol, null, undefined
  //Object: function, array

  //number
  const num: number = 3 //타입을 지정하면 변경할 수 없다.

  //string
  const str: string = 'hi'

  // boolean
  const bolea: boolean = false

  //undefined (비어있는지 안 비어있는지 아직 미결정)
  let old: undefined //💩
  let ages: number | undefined // |(or) union
  ages = undefined
  ages = 1

  function find(): number | undefined {
    return undefined
  }

  //null (명확하게 비어있다)
  let person: null //💩
  let person2: string | null

  //unknown 💩 가능하면 쓰지 않는 것이 좋다. Type을 구체적으로 명시하는 편이 좋다.
  //JavaScript 와 연동해서 사용할 때 주로 쓴다.
  let notSure: unknown = 0
  notSure = 'he'
  notSure = true

  //any 💩 가능하면 쓰지 않는 것이 좋다.
  let anything: any = 0
  anything = 'hello'

  //void
  //function에서 어떤 것도 return하지 않을 때 사용. 생략 가능.
  function print(): void {
    return
  }
  let unusable: void = undefined //변수에서 void를 사용하면 undefined만 할당할 수 있다. 💩

  //never
  // 절대 return하지 않을 경우 사용.
  function throwError(message: string): never {
    //message -> server(log)
    throw new Error(message)
    while (true) {} //Unreachable code detected.
  }
  let neverEnding: never //💩

  //object  💩
  //primitive type제외한 모든 object타입(array등) 할당 가능.
  let obj: object
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: 'skylar' })
  acceptSomeObject({ animal: 'dog' })
}
