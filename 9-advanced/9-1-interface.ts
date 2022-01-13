{
  //Type Vs Interface

  //Interface = 규격사항, 계약서
  //규격사항을 정의하고 규격사항을 따라 구현된다면 interface를 따르는 것이 맞다.

  //Type = data의 모습, type을 결정하는 것. 데이터를 구현하는 것이 목적이 아니라,
  //데이터를 담을 목적이라면 type을 쓰는 것이 맞다. 예전엔 type으로 할 수 있는 것이 별로 없어서
  //interface 사용을 권장했지만 지금은 type alias가 더 강력해졌기 때문에 사용법에 따라 구분해서
  //쓰는 것이 더 좋다.

  // export namespace IUsers{
  //   export interface Request {}
  //   export interface Response {}
  // }

  type PositionType = {
    x: number
    y: number
  }

  interface PositionInterface {
    x: number
    y: number
  }

  //Type, Interface both are possible ⭐️

  //object ⭐️

  const obj1: PositionType = {
    x: 1,
    y: 1,
  }
  const obj2: PositionInterface = {
    x: 1,
    y: 1,
  }

  //class ⭐️

  class Pos1 implements PositionType {
    x: number
    y: number
  }

  class Pos2 implements PositionInterface {
    x: number
    y: number
  }

  //Extends ⭐️
  interface ZPositionInterface extends PositionInterface {
    z: number
  }
  type ZPositionType = PositionType & { z: number }

  //only Interface 🔱

  //interfaces can be marged. 🔱
  //type can't be marged. ❌
  interface PositionAdd {
    x: number
    y: number
  }

  interface PositionAdd {
    z: number
  }

  const obj3: PositionAdd = {
    x: 1,
    y: 1,
    z: 1,
  }

  //only Type 🟣

  //only aliases can use computed properties 🟣
  type Person = {
    name: string
    age: number
  }
  type Name = Person['name'] // string

  //make new type 🟣
  //interface can't make new type
  type NumberType = number

  //make Union type 🟣
  //interface can't use Union
  type Direction = 'left' | 'right'
}
