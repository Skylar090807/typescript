{
  //Readonly 활용
  type ToDo = {
    title: string
    description: string
  }

  //TypeScript에서 이미 많은 것들을 utility type으로 만들어 두었다.
  function display(todo: Readonly<ToDo>) {
    // todo.title = 'study'
  }
}
