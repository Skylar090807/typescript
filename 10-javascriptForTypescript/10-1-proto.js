{
  // Prototype

  //[[Prototype]]: Object 🟡
  const x = {}
  const y = {}
  console.log(x)
  console.log(y)

  /*
    아무 것도 들어있지 않은 object를 생성한다.
    console에 출력하면 빈 object에 proto가 들어있는 걸 볼 수 있다.
    
    [[Prototype]]: Object
    prototype은 object 이다.
    JavaScript에서 모든 object는 Object라는 proto를 상속한다.

    prototype은 아래와 같은 함수들을 상속하고 있다.
    constructor: ƒ Object()
    hasOwnProperty: ƒ hasOwnProperty()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
    __defineGetter__: ƒ __defineGetter__()
    __defineSetter__: ƒ __defineSetter__()
    __lookupGetter__: ƒ __lookupGetter__()
    __lookupSetter__: ƒ __lookupSetter__()
    __proto__: (...)
    get __proto__: ƒ __proto__()
    set __proto__: ƒ __proto__() 
  */

  //빈 object도 proto 상속으로 기본 제공되는 함수들을 사용할 수 있다.
  console.log(x.toString())

  //각각 다른 object x와 y의 proto는 왜 같을까?
  console.log(x.__proto__ === y.__proto__) //true
  //같은 proto object를 상속 받았기 때문.

  //[[Prototype]]: Array(0) 🟡
  const array = []
  console.log(array)
  /* 
  JavaScript 모든 array는 Array라는 proto를 상속한다.
  [[Prototype]]: Array(0)는 아래와 같은 함수들을 상속하고 있다.
  
  [[Prototype]]: Array(0)
    at: ƒ at()
    concat: ƒ concat()
    constructor: ƒ Array()
    copyWithin: ƒ copyWithin()
    entries: ƒ entries()
    every: ƒ every()
    fill: ƒ fill()
    filter: ƒ filter()
    find: ƒ find()
    findIndex: ƒ findIndex()
    findLast: ƒ findLast()
    findLastIndex: ƒ findLastIndex()
    flat: ƒ flat()
    flatMap: ƒ flatMap()
    forEach: ƒ forEach()
    includes: ƒ includes()
    indexOf: ƒ indexOf()
    join: ƒ join()
    keys: ƒ keys()
    lastIndexOf: ƒ lastIndexOf()
    length: 0
    map: ƒ map()
    pop: ƒ pop()
    push: ƒ push()
    reduce: ƒ reduce()
    reduceRight: ƒ reduceRight()
    reverse: ƒ reverse()
    shift: ƒ shift()
    slice: ƒ slice()
    some: ƒ some()
    sort: ƒ sort()
    splice: ƒ splice()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    unshift: ƒ unshift()
    values: ƒ values()
    Symbol(Symbol.iterator): ƒ values()
    Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
    [[Prototype]]: Object 🟡

  변수 array는 Array라는 proto를 상속받고 Array proto는 Object라는 proto를 상속받는다.
  Array proto안에 있는 함수와 Object proto안에 있는 함수를 모두 사용할 수 있다.
  */

  function CoffeeMachine(beans) {
    this.beans = beans
    //constructor function 안에 만들게 되면 만들어지는 object마다 포함된다.
    //Instance(object) member level
    // this.makeCoffee = (shots) => {
    //   console.log('making...☕️')
    // }
  }

  //Prototype member level
  // CoffeeMachine.prototype.makeCoffee = function () {}
  CoffeeMachine.prototype.makeCoffee = (shots) => {
    console.log('making...☕️') //console 창을 확인하면 CoffeeMachine안에 makeCoffee는 더 이상 없고
    //Prototype 안에 makecoffee가 들어있는 것을 확인 할 수 있다.
  }

  const machine1 = new CoffeeMachine(10)
  const machine2 = new CoffeeMachine(20)
  console.log(machine1)
  console.log(machine2)

  /*
  machine1, 2는 CoffeeMachine이라는 proto를 가지고 상속하고, CoffeeMachine은 Object라는 proto를 가지고 상속하고 있다.
  Object > CoffeeMachine > machine
   */

  function LatteMachine(milk) {
    this.milk = milk
  }

  LatteMachine.prototype = Object.create(CoffeeMachine.prototype)

  const latteMachine = new LatteMachine(123) //전달 받는 milk가 string인지 number인지 알 수 없어도 동작한다.
  console.log(latteMachine)

  latteMachine.makeCoffee()
  //prototype은 javascript에서 상속을 사용하기 위해 쓴다.(코드 재사용)
}
