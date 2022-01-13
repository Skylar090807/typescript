{
  //Generic 포괄적
  //어떤 타입이든지 받을 수 있고, generic 함수를 쓸 때 타입이 결정되어 타입을 보장받을 수 있다.

  //function을 generic하게 만들자.
  //인자가 null인지 체크하는 함수 만들기.

  //Bad!
  //인자가 number인 경우만 null을 체크할 수 있다.
  function checkNotNullBad(arg: number | null): number {
    if (arg == null) {
      throw new Error('not valid number!')
    }
    return arg
  }

  //Bad!
  //인자가 number가 아닌 경우에도 체크할 수 있지만 type이 any이기 때문에
  // console 결과가 any로 찍혀 null을 확인할 수 없고 type이 안전하지 않다.
  function checkNotNullAnyBad(arg: any | null): any {
    if (arg == null) {
      throw new Error('not valid data!')
    }
    return arg
  }

  //generic function 사용법
  //function 함수명<T>(arg: T | null): T {}
  //T = Type, 임의의 알파벳을 지정해 사용한다.
  function checkNotNull<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error('not valid data!')
    }
    return arg
  }

  const number = checkNotNull(123)
  console.log(number)
  const boal: boolean = checkNotNull(true)
}
