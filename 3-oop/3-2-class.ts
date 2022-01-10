{
  // 3-1-whithout-oop를 OOP으로 만들기

  type CoffeeCup = {
    shots: number
    hasMilk: boolean
  }

  class CoffeeMaker {
    //class 안에서 멤버변수 작성 시 const, let을 사용하지 않는다
    static BEANS_GRAM_PER_SHOT: number = 7 //class level : 오브젝트 마다 생성되지 않는다
    coffeeBeans: number = 0 // instance(object) level

    //constructor 함수는 class를 가지고 object를 만들 때 항상 호출되는 함수.
    constructor(beans: number) {
      this.coffeeBeans = beans
    }

    //static 키워드는 멤버변수 뿐아니라 함수에도 적용 가능.
    //class 내에서 constructor를 호출하지 않는 함수가 된다.
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans)
    }

    //함수도 function 키워드 사용 x
    //class 안에 있는 멤버변수에 접근할 때 항상 this. 사용
    //class 안에 있는 멤버변수에 static을 붙이면 class level이 되므로 this.이 아닌 classname.으로 접근한다.
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans! ☕️')
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT
      return {
        shots, //shots: shots   key와 value의 이름이 동일하다면 생략 가능.
        hasMilk: false,
      }
    }
  }

  //new 키워드 = class의 새로운 instance를 만든다. 클래스명 뒤 '()' 는 생성자 호출.
  //coffeeMaker의 constructor함수의 인자 beans number를 넘겨받는다.
  const maker = new CoffeeMaker(32)
  console.log(maker)
  const maker2 = new CoffeeMaker(14)
  console.log(maker2)

  //class 내부에서 constructor를 호출하지 않는 static 함수, 즉 class level 함수를 상속받는 instatnce를 만들 때는 new키워드를 쓰지 않고 클래스명.함수명 으로 접근한다.
  const maker3 = CoffeeMaker.makeMachine(3)
}
