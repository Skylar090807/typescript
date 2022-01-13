{
  //Index Type
  //다른 type에 있는 key에 접근해서 그 key의 value의 type을 그대로 다시 선언할 수 있다.

  const obj = {
    name: 'skylar',
  }
  // object name에 접근하는 방법
  obj.name
  obj['name'] //index 접근하는 것 처럼 key name으로 접근.

  type Animal = {
    name: string
    age: number
    gender: 'male' | 'female'
  }
  type Name = Animal['name'] //string
  const text: Name = 'hello'

  type Gender = Animal['gender'] // 'male' | 'female'

  type keys = keyof Animal
  // name: string
  // age: number
  // gender: 'male' | 'female'
  const key: keys = 'gender'

  type Person = {
    name: string
    gender: Animal['gender']
  }

  const person: Person = {
    name: 'skylar',
    gender: 'female',
  }
}
