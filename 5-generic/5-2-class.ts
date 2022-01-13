//either: a or b
//호출하면 number를 전달하는 class를 generic class로 바꿔보자.
interface IEither {
  left: () => number
  right: () => number
}

class SimpleEither implements IEither {
  constructor(private leftValue: number, private rightValue: number) {}
  left(): number {
    return this.leftValue
  }

  right(): number {
    return this.rightValue
  }
}
const either = new SimpleEither(4, 5)
either.left() //4
either.right() //5

//generic class로 바꾸기.
interface IEither2<L, R> {
  left: () => L
  right: () => R
}

class SimpleEither2<L, R> implements IEither2<L, R> {
  constructor(private leftVlaue: L, private rightValue: R) {}
  left(): L {
    return this.leftVlaue
  }

  right(): R {
    return this.rightValue
  }
}

const genericEither: IEither2<string, number> = new SimpleEither2('abc', 123)
genericEither.left() // 'abc'
genericEither.right() // 123

const best = new SimpleEither2('apple', 'banana')
best.left()
best.right()

//object type도 가능하다.
const obj = new SimpleEither2({ name: 'skylar' }, { age: 33 })
