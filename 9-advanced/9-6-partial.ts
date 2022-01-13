{
  //partial type

  //partial은 TypeScript제공 utility type
  type Partial<T> = {
    [P in keyof T]?: T[P]
  }

  type ToDo = {
    title: string
    description: string
    label: string
    priority: 'high' | 'low'
  }

  //partial type 사용
  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate }
    //기존 ToDo에 있는 데이터를 spread operator를 이용해서 하나하나 복사한 다음,
    //복사 된 곳에 전달 된 fieldsToUpdate를 덮어 씌운다.
  }

  const todo: ToDo = {
    title: 'learn TypeScript',
    description: 'study hard',
    label: 'study',
    priority: 'high',
  }

  const updated = updateTodo(todo, { priority: 'low' })
  console.log(updated)
  // {
  //   title: 'learn TypeScript',
  //   description: 'study hard',
  //   label: 'study',
  //   priority: 'high'
  // } //updateTodo에 있는 데이터를 그대로 가져가면서 priority만 변경되었다.

  //Partial 이란 utility type은 기존 데이터를 가져가면서 일부분만 변경하고 싶을 때 사용한다.
}
