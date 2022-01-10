{
  //Array
  const fruits: string[] = ['🍏', '🍊', '🍋', '🍌', '🍉']
  const scores: number[] = [1, 2, 3, 4, 5]
  const scores2: Array<number> = [6, 7, 8]
  function pintArray(fruits: readonly string[]) {
    //readonly 를 붙여주면 fruits 배열은 읽어올 수만 있고 변경할 수 없다.
  }

  //Tuple -> interface, type alias, class
  // 서로 다른 타입의 데이터를 담을 수 있는 배열
  let student: [string, number]
  student = ['name', 123]
  student[0] //name
  student[1] //123
  // object destructuring
  const [name, age] = student
}
