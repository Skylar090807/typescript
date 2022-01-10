{
  //3-2-class 에서 만든 CofeeMaker를 Encapsulation 하기

  type CoffeeCup = {
    shots: number
    hasMilk: boolean
  }
  //제어자 publc, private, protected
  //public : 외부에서 접근 가능
  //private : 외부에서 절대 볼 수 없고 접근 불가능
  //protected : 외부에서는 접근 불가능, class를 상속한 자식 class에서만 접근 가능

  //Use private for Encapsulation 정보 은닉을 위한 private 사용
  class CoffeeMaker {
    //외부에서 커피를 만들 때 샷 당 콩이 몇 그램인지 알 필요 없으므로 private을 이용해 정보 은닉.
    private static BEANS_GRAM_PER_SHOT: number = 7
    //외부에서 coffeeBeans 자체를 접근할 수 없게 private으로 정보 은닉.
    private coffeeBeans: number = 0

    //함수에 static 키워드를 붙여 class level 함수를 제공한다면 외부에서 생성자를 이용해 생성하는 것을 금지하기 위한 것.
    //따라서 constructor 를 private으로 만들어서 항상 static method를 이용하도록 권장.
    private constructor(beans: number) {
      this.coffeeBeans = beans
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans)
    }

    //coffeeBeans 캡슐화 했으므로 coffeeBeans 수를 바꾸고 싶을 때 fillCoffeeBeans 함수를 이용해
    //바꿀 수 있도록 한다.
    //class 에서 함수는 따로 작성하지 않으면 기본적으로 public으로 인식한다.
    public fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('😓 value for beans should be greater than 0')
      }
      this.coffeeBeans += beans
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans! ☕️')
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT
      return {
        shots,
        hasMilk: false,
      }
    }
  }

  // const maker = new CoffeeMaker() // class CoffeeMaker의 constructor가 private이므로 new 키워드로 ()생성자 호출 불가.
  const maker = CoffeeMaker.makeMachine(32) // 생성자 call static fuction in class CoffeeMaker
  maker.fillCoffeeBeans(32)
}
