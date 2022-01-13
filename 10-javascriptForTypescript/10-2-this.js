{
  //this
  /*
    다른 언어에서 this는 class 안에서 자기자신을 가리킨다.
    class 안에서 구현한 객체에서 this. 를 호출한다면 각각 구현한 생성된 객체 자기 자신을 가리킨다.
    즉, this.란 만들어진 객체 자기자신을 가리키는 것이다.

    그러나 JavaScript에서 this.는 만들어진 객체 자기자신을 가리키는 것이 아니다.
    누가 호출하느냐에 따라서 호출한 문맥에 따라서 this가 가리키는 대상이 달라진다.

   */

  /* 아무 것도 하지 않고 this를 호출하면
   브라우저 환경에선 Window가 global 객체이므로 Window가 this가 된다.
  */
  console.log(this)

  // 함수를 안에서 this.를 호출해도 console에서 확인해보면 this는 Window.
  function simpleFunc() {
    console.log(this)
  }
  window.simpleFunc()
  simpleFunc() //모두 this는 window. window에서 호출했기 때문.

  console.clear()

  /*class를 만들어 class 안에서 increase라는 this를 호출하는 함수를 만들고
    new키워드로 Counter를 전달받는 counter object를 만들면 this는 Counter가 된다.
  */
  class Counter {
    count = 0
    increase = function () {
      console.log(this)
    }
  }
  const counter = new Counter()
  counter.increase() //counter에서 호출했으므로 this는 Counter.

  /*  caller에 counter에 있는 increase를 할당.
      원래 counter에 있는 increase 내 this는 Counter를 가리키고 있었으나
      counter.increase 포인터를 caller라는 변수에 할당했기 때문에 this의 정보를 잃어버렸다.
      let과 const로 선언한 변수는 Window에 등록되어있지 않으므로 
      변수 caller를 호출하는 것은 그 어떤 Object도 아니기 때문에 this는 undefined이 된다.
   */
  const caller = counter.increase
  caller() //undefined

  /* JavaScript에서 function을 정의하면 기본적으로 global 객체에서 접근, 이용이 가능하다.
     함수 선언 후 바로 Window로 접근이 가능하다.
     내가 선언한 함수는 기본적으로 Window객체에 할당이 된다.
     {} 블록을 이용해서 local scope 에서 작성한 함수나 변수가 아니라 global 적으로 파일의
     최상위에서 선언한 것들은 글로벌 적으로 접근이 가능하다.
  */
  function World() {
    console.log('hello')
  }
  window.World()

  /* const나 let으로 선언하면 Window에 등록되지 않는다.
   */

  /*
    var!!!
    var 키워드를 쓰면 Window에 기본적으로 등록 된다. Window에서 접근이 가능하다.
    var 키워드로 선언하면 가장 아래에서 선언했는데 hoisting되어 가장 위로 올라오는 문제가 생긴다.
    선언 후 다시 재정의가 되는 문제가 생긴다.
  */
  var badVar = 'bad'
  console.log(window.badVar)

  class Alexis {}
  const alex = new Alexis()
  alex.run = counter.increase
  alex.run() //Alexis가 출력된다. 왜냐하면 run이라는 함수는 alex가 호출했기 때문이다.

  /* this라는 정보는 함수를 다른 곳으로 할당하는 순간 잃어버릴 수 있기 때문에
     this와 object를 묶어주려면 bind를 사용해야 한다.
  */
  const counter2 = new Counter()
  const caller2 = counter.increase.bind(counter2)
  caller2() //Counter

  /*
    직접 bind()하지 않고 arrow function으로 bind하기.
    arrow function을 이용하게 되면 따로 bind를 이용하지 않아도 연결된다.
    arrow functions을 이용하면 다른 언어에서 class 안의 디스를 이용하면
    자기 자신을 가리키는 것처럼, 선언 된 당시의 문맥 scope의 this context를 유지한다.
  */
  class Counter2 {
    count = 0
    increase = () => {
      console.log(this)
    }
  }
  const counter3 = new Counter2()
  counter3.increase() //Counter2
}
