{
  // Type Aliases
  type Text = string
  const name: Text = 'skylar'
  const address: Text = 'korea'

  type Num = number

  type Student = {
    name: string
    age: number
  }
  const student: Student = {
    name: 'skylar',
    age: 12,
  }

  //String Literal Types

  type Name = 'name'
  let skylarName: Name
  type JSON = 'json'
  const json: JSON = 'json'

  type Boal = true
  const isCat: Boal = true // false를 할당할 수 없다.
}
