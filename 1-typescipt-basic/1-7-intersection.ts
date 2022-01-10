{
  //Intersection Types: &
  //Union이 모든 케이스 중에 하나만 선택하는 것이고, Intersection은 모든 케이스들을 다 합한 것.

  type Student = {
    name: string
    score: number
  }

  type Worker = {
    employeeId: number
    work: () => void
  }

  function internWork(person: Student & Worker) {
    console.log(person.name, person.employeeId, person.work())
  }
  internWork({
    name: 'skylar',
    score: 1,
    employeeId: 123,
    work: () => {},
  }) // internWork function을 호출할 때는 type을 지정해준 Student와 Worker 모두 작성해야 에러가 생기지 않는다.
}
