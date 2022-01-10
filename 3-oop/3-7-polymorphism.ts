{
  type CoffeeCup = {
    shots: number
    hasMilk?: boolean
    hasSugar?: boolean
  }

  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup
  }

  class CoffeeMakerImpl implements ICoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7

    private coffeeBeans: number = 0

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
        hasSugar: false,
      }
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots)
      this.preheat()
      return this.extract(shots)
    }
  }

  class CaffeLatteMachine extends CoffeeMakerImpl {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans)
    }

    private steamMilk(): void {
      console.log('Steaming some milk...🥛')
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots)
      this.steamMilk()
      return {
        ...coffee,
        hasMilk: true,
      }
    }
  }

  class SweetCoffeeMaker extends CoffeeMakerImpl {
    addSugar(): void {
      console.log('add Sugar in your coffee...🍭')
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots)
      this.addSugar()
      return {
        ...coffee,
        hasSugar: true,
      }
    }
  }

  const machine = [
    new CoffeeMakerImpl(32),
    new CaffeLatteMachine(32, 'SSCoffee123'),
    new SweetCoffeeMaker(32),
    new CoffeeMakerImpl(32),
    new CaffeLatteMachine(32, 'SSCoffee123'),
    new SweetCoffeeMaker(32),
  ]

  machine.forEach((machine) => {
    console.log('------------------------')
  })
}
