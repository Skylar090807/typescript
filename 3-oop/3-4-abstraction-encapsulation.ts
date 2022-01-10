{
  //Abstraction 추상화

  //방법 1. encapsulation을 통해서 abstraction 하기
  //제어자를 통해서 사용자가 알 필요 없는 부분을 encapsulation해주면 사용자가 보다 편하게 사용할 수 있다.

  //방법 2. interface를 이용하기
  //interface는 의사소통 하기위한 명세서를 작성해둔 계약서 같은 기능.
  type CoffeeCup = {
    shots: number
    hasMilk: boolean
  }

  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7

    private coffeeBeans: number = 0

    private constructor(beans: number) {
      this.coffeeBeans = beans
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans)
    }

    public fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('😓 value for beans should be greater than 0')
      }
      this.coffeeBeans += beans
    }

    clean() {
      console.log('Now Cleaning the Coffee Machine 😷')
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`)
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans! ☕️')
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT
    }

    private preheat(): void {
      console.log('preheat for warm coffee')
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...☕️ `)
      return {
        shots,
        hasMilk: false,
      }
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots)
      this.preheat()
      return this.extract(shots)
    }
  }

  const maker: CoffeeMaker = CoffeeMaker.makeMachine(32)
  maker.fillCoffeeBeans(32)
  maker.makeCoffee(2)
}
