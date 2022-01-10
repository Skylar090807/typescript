{
  //Type Inference 타입 추론

  let text = 'hello' //text 에 : string을 지정하지 않아도 typescript가 string이라고 추론한다.
  text = 'hi' //문자열을 지정하는 것은 괜찮지만,
  // text = 9 // number를 지정하면 에러가 발생한다.
  function print(message) {
    //type을 명시하지 않으면 any로 지정된다.
    console.log(message)
  }
  print('hello')
  print(1) // any로 지정되면 string, number type에 상관 없이 전부 지정 가능하다.

  function print2(message = 'Hello') {
    console.log(message)
  }
  print2('wow')
  // print2(1) //error : default parameter를 string으로 지정했기 때문에 typescript가 print2를 string으로 추론한다.

  function add(x: number, y: number) {
    return x + y //return x, y의 type을 지정하지 않아도 typescript는 인자 x, y가 숫자이므로 return 값도 숫자로 추론한다.
  }
  const result = add(1, 2) // add type이  number이므로 result의 type도 number라고 추론.
}
