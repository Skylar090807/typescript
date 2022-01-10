{
  //Union Types : Or |
  //발생할 수 있는 많은 케이스 중에 딱 하나만 담을 수 있을 때 사용.
  type Direction = 'left' | 'right' | 'up' | 'down'
  function move(direction: Direction) {
    console.log(direction)
  }
  move('down') //move() 괄호 안에 ''를 작성하는 순간 type Direction의 네 가지 경우가 모두 뜬다.

  type TileSize = 8 | 16 | 32
  const tiles: TileSize = 16 // TileSize 중 하나만 할당 가능

  //Alias - String Literal Types과 Union 실전 예제 no.1
  //function: login -> success or fail
  // success : print success reason
  // fail : print fail reason

  // code by skylar
  type Login = 'success' | 'fail'
  function login(login: Login) {
    if (login === 'success') {
      console.log(`${login} reason is success`)
    } else if (login === 'fail') {
      console.log(`${login} reason is fail`)
    }
  }

  console.log(login)

  // code by teacher
  type SuccessState = {
    response: {
      body: string
    }
  }
  type FailState = {
    reason: string
  }
  type LoginState = SuccessState | FailState
  function login3(id: string, password: string): LoginState {
    return {
      response: {
        body: 'logged in!',
      },
    }
  }

  //Alias - String Literal Types과 Union 실전 예제 no.2
  //printLoginState(state: LoginState)
  //sucess -> 👑 body
  //fail -> 😭 reason

  // code by skyalr
  function printLoginState2(state: LoginState) {
    if ('response' in state) {
      //in 을 사용해서 할 수도 있지만 그렇게 좋지 않다.
      console.log(`👑 ${state.response.body}`)
    } else {
      console.log(`😭 ${state.reason}`)
    }
  }
}
