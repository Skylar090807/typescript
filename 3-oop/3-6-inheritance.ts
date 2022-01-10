{
  type CoffeeCup = {
    shots: number
    hasMilk: boolean
  }

  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup
  }

  //parent class
  class CoffeeMakerImpl implements ICoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7

    private coffeeBeans: number = 0

    //child class에서 상속 가능하도록 제어자를 protected로 지정.
    constructor(beans: number) {
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

  //child class
  class CaffeLatteMachine extends CoffeeMakerImpl {
    //부모 클래스를 상속한 자식 클래스에서 contstructor를 만들 땐 항상 super()를 호출해야 한다.
    //부모 constructor의 인자도 항상 가져와야 한다.
    constructor(beans: number, public readonly serialNumber: string) {
      //serialNumber 인자의 제어자가 public이지만 readonly를 설정해줌으로써 외부에서 읽을 수 있지만 한번 설정하면 바뀔 수 없게 지정.
      super(beans)
    }

    private steamMilk(): void {
      console.log('Steaming some milk...🥛')
    }

    //method overwriting?
    makeCoffee(shots: number): CoffeeCup {
      //super. 부모 class에 있는 함수 호출
      const coffee = super.makeCoffee(shots)
      this.steamMilk()
      return {
        ...coffee,
        hasMilk: true,
      }
    }
  }

  const machine = new CoffeeMakerImpl(36)
  const latteMachine = new CaffeLatteMachine(36, 'ASSCOFFEEKOREA1234')
  const coffee = latteMachine.makeCoffee(2)
  console.log(coffee)
  console.log(latteMachine.serialNumber)
}
