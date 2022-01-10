{
  //Problem of Inheritance 상속의 문제점
  //상속의 깊이가 깊어질 수록 관계가 점점 복잡해진다.
  //Classes can only extend a single class. TypeScript에서는 부모 클래스를 하나만 상속할 수 있다.
  //이러한 상속의 문제 때문에 Composition을 사용하는 것이 더 좋다.

  //Composition 구성

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

  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log('Steamming some milk...🥛')
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk()
      return {
        ...cup,
        hasMilk: true,
      }
    }
  }

  class CandySugarMixer {
    private getSugar() {
      console.log('add Sugar in your coffee...🍭')
      return true
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar()
      return {
        ...cup,
        hasSugar: sugar,
      }
    }
  }

  //Compositon 방법
  //Dependency Injection
  //constructor에 인자를 전달하는 방식으로 Dependency Injection 해주어 Composition할 수 있다.
  class CaffeLatteMachine extends CoffeeMakerImpl {
    constructor(beans: number, public readonly serialNumber: string, private milkFrother: CheapMilkSteamer) {
      super(beans)
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots)
      return this.milkFrother.makeMilk(coffee)
    }
  }

  class SweetCoffeeMaker extends CoffeeMakerImpl {
    //constructor 인자 sugar에 제어자 private을 붙여서 멤버변수로 만든다.
    constructor(private sugar: CandySugarMixer, beans: number) {
      super(beans)
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots)
      return this.sugar.addSugar(coffee)
    }
  }

  // Classes can only extend a single class.
  // class SweetCaffeLatteMachine extends SweetCoffeeMaker, CaffeLatteMachine {}
  // SweetCoffeeMaker, CaffeLatteMachine를 받아와 재사용하는 SweetCaffeLatteMachine을 만들고 싶다면
  // Composition을 사용한다.

  //Compositon -> Dependency Injection
  class SweetCaffeLatteMachine extends CoffeeMakerImpl {
    constructor(private beans: number, private milk: CheapMilkSteamer, private sugar: CandySugarMixer) {
      super(beans)
    }
    //makeCoffee 함수 overwriting
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots)
      // return this.milk.makeMilk(this.sugar.addSugar(coffee)) line 148, 149와 동일.
      const sugarAdded = this.sugar.addSugar(coffee)
      return this.milk.makeMilk(sugarAdded)
    }
  }

  const cheaMilkMaker = new CheapMilkSteamer()
  const CandySuga = new CandySugarMixer()
  const sweetMachine = new SweetCoffeeMaker(CandySuga, 32)
  const latteMachine = new CaffeLatteMachine(32, 'SSCOFFEE123', cheaMilkMaker)
  const sweetLatteMachine = new SweetCaffeLatteMachine(32, cheaMilkMaker, CandySuga)

  //Composition 장점과 단점
  //장점: 재사용률을 높여준다.
  //단점: dependency injection을  주고 받은 class 관계는 굉장히 타이트하게 커플링 되어있다.
  //     injection된 클래스 외 다른 클래스를 만들어 사용하고 싶다면 모두 업데이트 해줘야 한다.
  //     dependency injection 받은 class만 사용하도록 스스로를 제약시키는 형태가 된다.
  //"class와 class간의 관계는 서로 잘 모를수록 좋다"
}
