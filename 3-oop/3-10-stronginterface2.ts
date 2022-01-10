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

    constructor(beans: number, private milk: IMilkFrother, private sugar: ISugarProvider) {
      this.coffeeBeans = beans
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
      const coffee = this.extract(shots)
      const sugarAdded = this.sugar.addSugar(coffee)
      return this.milk.makeMilk(sugarAdded)
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

  class NoMilkIplm implements IMilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup
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

  class NoSugarIplm implements ISugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup
    }
  }

  //Milk
  const cheapMilkSteamer = new CheapMilkSteamerIplm()
  const fancyMilkSteamer = new FancyMilkSteamerIplm()
  const coldMilkSteamer = new ColdMilkSteamerIplm()
  const noMilkSteeamer = new NoMilkIplm()

  //Sugar
  const candySugar = new CandySugarMixerIplm()
  const sugar = new SugarMixerIplm()
  const noSugar = new NoSugarIplm()

  //Machine
  const fancySweetLatteMachine = new CoffeeMakerImpl(32, fancyMilkSteamer, sugar)
  const cheapSweetLatteMachine = new CoffeeMakerImpl(32, cheapMilkSteamer, candySugar)
  const coldSweetlatteMachine = new CoffeeMakerImpl(32, coldMilkSteamer, sugar)
  const coffeeMachine = new CoffeeMakerImpl(32, noMilkSteeamer, noSugar)
}
