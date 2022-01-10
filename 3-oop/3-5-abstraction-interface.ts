{
  //Abstraction 추상화

  //방법 2. interface를 이용하기
  //interface는 의사소통 하기위한 명세서를 작성해둔 계약서 같은 기능.
  type CoffeeCup = {
    shots: number
    hasMilk: boolean
  }

  //interface명 앞에 I추가
  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup
  }

  interface ICommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup
    fillCoffeeBeans(beans: number): void
    clean(): void
  }

  //구현 class 뒤에 Impl추가
  //class CoffeeMakerImpl is implements interface ICoffeeMaker, ICommercialCoffeeMaker
  class CoffeeMakerImpl implements ICoffeeMaker, ICommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7

    private coffeeBeans: number = 0

    private constructor(beans: number) {
      this.coffeeBeans = beans
    }

    static makeMachine(coffeeBeans: number): CoffeeMakerImpl {
      return new CoffeeMakerImpl(coffeeBeans)
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
      if (this.coffeeBeans < shots * CoffeeMakerImpl.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans! ☕️')
      }
      this.coffeeBeans -= shots * CoffeeMakerImpl.BEANS_GRAM_PER_SHOT
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

  class AmateurUser {
    constructor(private machine: CoffeeMakerImpl) {}
    makeCoffee() {
      const cofee = this.machine.makeCoffee(2)
    }
  }

  class ProBarista {
    constructor(private machine: ICommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee
      console.log(coffee)
      this.machine.fillCoffeeBeans(32)
      this.machine.clean()
    }
  }

  const maker: CoffeeMakerImpl = CoffeeMakerImpl.makeMachine(32)
  maker.fillCoffeeBeans(32)
  maker.makeCoffee(2)

  const maker2: ICoffeeMaker = CoffeeMakerImpl.makeMachine(32)
  // maker2.fillCoffeeBeans(32) //maker2 type을 interface로 했기 때문에 fillCoffeeBeans 관련된 것은 없으므로 에러 발생.
  maker2.makeCoffee(2)

  //type을 interface로 받게되면 interface에서 정의된 것만 사용할 수 있다.
  const maker3: ICommercialCoffeeMaker = CoffeeMakerImpl.makeMachine(32)
  maker3.clean()
  maker3.fillCoffeeBeans(32)
  maker3.makeCoffee(2)

  const maker4: CoffeeMakerImpl = CoffeeMakerImpl.makeMachine(32)
  //똑같이 maker4의 makeMachine을 받아와도 각자 interface에 규약된 내용이 달라 사용 범위가 다르다.
  const amatuer = new AmateurUser(maker4)
  const pro = new ProBarista(maker4)
  amatuer.makeCoffee()
  pro.makeCoffee()
}
