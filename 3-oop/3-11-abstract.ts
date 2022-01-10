{
  // abstract 추상화
  // abstract class를 사용하면 조금 더 안전하게 의도한 데로 공통적인 기능들을 수행하고
  // 기능에 따라 달라져야 되는 abstract class를 상속하는  child class 에서 꼭 구현하라고 강조할 수 있다.

  type CoffeeCup = {
    shots: number
    hasMilk?: boolean
    hasSugar?: boolean
  }

  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup
  }

  //parent class
  //abstract class
  //추상화 하고 싶은 class 앞에 abstract를 붙여준다.
  //abstract을 붙여준 class 자체로는 object를 만들 수 없다.
  //abstract class에서는 기능을 만들지 않고 필요한 것들을 정의해두는 용도로 쓴다.
  //함수 이름은 무엇인지, 어떤 인자를 받아서 어떤 것을 return 하는지 정의한다.
  //공통적으로 쓰이는 것은 제어자를 통해 내부적으로만 쓰이면 private, 외부에서도 쓰이면 public을 지정할 수 있다.
  //구현하는 곳에서마다 다르게 쓰이는 함수는 abstract을 붙여준뒤 자손 클래스 구현하는 곳에서 세부 구현을 해준다.
  //abstract class를 상속받은 child class에서 세부 구현 사항을 작성하지 않으면 에러 메시지가 뜬다.
  abstract class CoffeeMakerImpl implements ICoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7 //class level

    private coffeeBeans: number = 0 //instance (object) level

    constructor(beans: number) {
      this.coffeeBeans = beans
    }

    //Cannot create an instance of an abstract class.
    // static makeMachine(coffeeBeans: number): CoffeeMakerImpl {
    //   return new CoffeeMakerImpl(coffeeBeans)
    // }

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

    //abstract 에서는 private 제어자를 쓸 수 없다.
    //child class에서 접근할 수 있는 protected 제어자를 사용하고, abstract 앞에 작성한다.
    //abstract 추상적인 상태이기 때문에 구현 사항을 작성하면 안 된다.
    //abstract를 구현하는 클래스에서 항상 따로 구현해줘야 한다.
    protected abstract extract(shots: number): CoffeeCup

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots)
      this.preheat()
      return this.extract(shots)
    }
  }

  //child class
  class CaffeLatteMachine extends CoffeeMakerImpl {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans)
    }

    private steamMilk(): void {
      console.log('Steaming some milk...🥛')
    }

    //abstract 구현
    protected extract(shots: number): CoffeeCup {
      this.steamMilk()
      return {
        shots,
        hasMilk: true,
      }
    }
    // abstract 하게 되면 부모 클래스를 overwriting 할 필요가 없다.
    // makeCoffee(shots: number): CoffeeCup {
    //   const coffee = super.makeCoffee(shots)
    //   this.steamMilk()
    //   return {
    //     ...coffee,
    //     hasMilk: true,
    //   }
    // }
  }

  //child class
  class SweetCoffeeMaker extends CoffeeMakerImpl {
    addSugar(): void {
      console.log('add Sugar in your coffee...🍭')
    }

    //abstract 구현
    protected extract(shots: number): CoffeeCup {
      this.addSugar()
      return {
        shots,
        hasSugar: true,
      }
    }
  }

  const machine = [
    // CoffeeMakerImpl class는 abstract class이기 때문에 new키워드를 이용해 새로운 object로 만들 수 없다.
    // new CoffeeMakerImpl(32),
    new CaffeLatteMachine(32, 'SSCoffee123'),
    new SweetCoffeeMaker(32),
    // new CoffeeMakerImpl(32),
    new CaffeLatteMachine(32, 'SSCoffee123'),
    new SweetCoffeeMaker(32),
  ]

  machine.forEach((machine) => {
    console.log('------------------------')
  })
}
