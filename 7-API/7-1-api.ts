{
  Array

  type Student = {
    passed: boolean
  }
  const students: Student[] = [{ passed: true }, { passed: true }, { passed: false }]

  //every []에서 모든 값이 true일 때만 true.
  const result = students.every((student) => {
    return student.passed
  })
  console.log(result)

  class Animal {}
  class Cat extends Animal {
    isCat: boolean = true
  }
  class Dog extends Animal {
    isDog: boolean = false
  }
  const animals: Animal[] = [new Cat(), new Cat(), new Dog()]
  function isCat(animal: Animal): animal is Cat {
    return (animal as Cat).isCat !== undefined
  }
  animals.every<Cat>(isCat) //An argument for 'predicate' was not provided.
}
