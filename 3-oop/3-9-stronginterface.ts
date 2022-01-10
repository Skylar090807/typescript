{
  //Strong Interface

  // 지금 코드에서 composition의 문제점은 재사용성이 완전히 떨어진다는 것이다.
  // 현재 SweetCoffeMaker와 CaffeLatteMacine, SwettCaffeLatteMachine은 dependency injection한
  // CheapMilkSteamer와 CandySugarMixer만 사용 가능하다. 만약 고급밀크스티머와 고급설탕을 사용하고 싶다면 machine을 분리해서
  // 다시 만들어야 한다.

  //class들이 서로 긴밀한 의사소통을 하고있는 경우엔 class 자신을 노출하는 것이 아니라 계약서에 의거해서 의사소통을 해야한다.
  //즉 interface를 사용해야 한다. (디커플링의 원칙)

  //class들 간에 서로 커플링 된 것들을 interface를 통해 디커플링 한다.

  type CoffeeCup = {
    shots: number
    hasMilk?: boolean
    hasSugar?: boolean
  }

  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup
  }
  //milk, sugar관련 interface
  interface IMilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup
  }

  interface ISugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup
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

  //Milk
  class CheapMilkSteamerIplm implements IMilkFrother {
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

  class FancyMilkSteamerIplm implements IMilkFrother {
    private steamMilk(): void {
      console.log('✨ Fancy Steamming some milk...🥛✨')
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk()
      return {
        ...cup,
        hasMilk: true,
      }
    }
  }

  class ColdMilkSteamerIplm implements IMilkFrother {
    private steamMilk(): void {
      console.log('🍨 Cold Steamming some milk...🥛🍦')
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk()
      return {
        ...cup,
        hasMilk: true,
      }
    }
  }

  //Sugar
  class CandySugarMixerIplm implements ISugarProvider {
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

  class SugarMixerIplm implements ISugarProvider {
    private getSugar() {
      console.log('add Sugar in your coffee...👍 🌫')
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

  //class Caffelattemachine의 기존 constructor(milkFrother:CeapMilkSteamer)처럼 class에서 받아오는 것이 아니라,
  //construcrtor(milkfrother:IMilkFrother) interface를 인자로 받아온다.
  class CaffeLatteMachine extends CoffeeMakerImpl {
    constructor(beans: number, public readonly serialNumber: string, private milkFrother: IMilkFrother) {
      super(beans)
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots)
      return this.milkFrother.makeMilk(coffee)
    }
  }

  //class SweetCoffeeMaker  constructor(private sugar: CandySugarMixerIplm) -> constructor(private sugar:ISugarProvider)
  class SweetCoffeeMaker extends CoffeeMakerImpl {
    constructor(private sugar: ISugarProvider, beans: number) {
      super(beans)
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots)
      return this.sugar.addSugar(coffee)
    }
  }

  //milk: IMilkFrother, sugar: ISugarProvider
  class SweetCaffeLatteMachine extends CoffeeMakerImpl {
    constructor(private beans: number, private milk: IMilkFrother, private sugar: ISugarProvider) {
      super(beans)
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots)
      const sugarAdded = this.sugar.addSugar(coffee)
      return this.milk.makeMilk(sugarAdded)
    }
  }

  //Milk
  const cheapMilkMaker = new CheapMilkSteamerIplm()
  const fancyMilkMaker = new FancyMilkSteamerIplm()
  const coldMilkMaker = new ColdMilkSteamerIplm()

  //Sugar
  const CandySuga = new CandySugarMixerIplm()
  const sugar = new SugarMixerIplm()

  //SweetMachine
  const sweetCandyMachine = new SweetCoffeeMaker(CandySuga, 32)
  const sweetmachine = new SweetCoffeeMaker(sugar, 32)
  //LatteMachine
  const latteMachine = new CaffeLatteMachine(32, 'SSCOFFEE123', cheapMilkMaker)
  const fancyLatteMachine = new CaffeLatteMachine(32, 'SSSCOFFEE123', fancyMilkMaker)
  const coldLatteMachine = new CaffeLatteMachine(32, 'SCOLDCOFFEE123', coldMilkMaker)
  //SweetLatteMachine
  const sweetLatteMachine = new SweetCaffeLatteMachine(32, cheapMilkMaker, CandySuga)
}
