{
  interface IEmployee {
    pay(): void
  }

  class FullTimeEmployeeImpl implements IEmployee {
    pay() {
      console.log(`full time!`)
    }
    workFullTime() {}
  }

  class PartTimeEmployeeImpl implements IEmployee {
    pay() {
      console.log(`part time!`)
    }
    workPartTime() {}
  }

  //세부적인 타입을 인자로 받아 추상적인 타입으로 다시 리턴하는 함수는 나쁘다. 💩
  function payBad(employee: IEmployee): IEmployee {
    employee.pay()
    return employee
  }

  //generic
  function pay<T extends IEmployee>(employee: T): T {
    return employee
  }

  const skylar = new FullTimeEmployeeImpl()
  const sophia = new PartTimeEmployeeImpl()
  skylar.workFullTime()
  sophia.workPartTime()

  const skylarAfterPay = pay(skylar)
  const sophiaAfterPay = pay(sophia)
  skylarAfterPay.workFullTime()
  sophiaAfterPay.workPartTime()

  //실습문제
  //console.log에 getvalue함수를 호출하면 아래와 같이 나오도록 generic을 이용하여 getvalue함수를 만들어라.

  const obj = {
    name: 'skylar',
    age: 33,
  }

  const obj2 = {
    animal: '🐶',
  }

  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
  }

  console.log(getValue(obj, 'name')) //skylar
  console.log(getValue(obj, 'age')) //33
  console.log(getValue(obj2, 'animal')) //🐶
}
