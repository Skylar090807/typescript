{
  //local scope
  //
  //Imperative and Procedural Programming
  //절차지향적으로 make coffee function 만들기

  type CoffeeCup = {
    shots: number
    hasMilk: boolean
  }

  const BEANS_GRAM_PER_SHOT: number = 7

  let coffeBeans: number = 0

  function makeCoffee(shots: number): CoffeeCup {
    if (coffeBeans < shots * BEANS_GRAM_PER_SHOT) {
      throw new Error('Not enough coffee beans! ☕️')
    }
    coffeBeans -= shots * BEANS_GRAM_PER_SHOT
    return {
      shots, //shots: shots   key와 value의 이름이 동일하다면 생략 가능.
      hasMilk: false,
    }
  }

  coffeBeans += 3 * BEANS_GRAM_PER_SHOT
  const coffee = makeCoffee(2)
  console.log(coffee)
}
