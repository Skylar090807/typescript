{
  //Array
  const fruits: string[] = ['π', 'π', 'π', 'π', 'π']
  const scores: number[] = [1, 2, 3, 4, 5]
  const scores2: Array<number> = [6, 7, 8]
  function pintArray(fruits: readonly string[]) {
    //readonly λ₯Ό λΆμ¬μ£Όλ©΄ fruits λ°°μ΄μ μ½μ΄μ¬ μλ§ μκ³  λ³κ²½ν  μ μλ€.
  }

  //Tuple -> interface, type alias, class
  // μλ‘ λ€λ₯Έ νμμ λ°μ΄ν°λ₯Ό λ΄μ μ μλ λ°°μ΄
  let student: [string, number]
  student = ['name', 123]
  student[0] //name
  student[1] //123
  // object destructuring
  const [name, age] = student
}
