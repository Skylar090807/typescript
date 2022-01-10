{
  //Discriminated Union
  //Union을 사용할 때 어떤 케이스든 공통적인 property를 사용함으로써 좀 더 구분하기 쉽게 도와준다.

  type SuccessState = {
    result: 'success'
    response: {
      body: string
    }
  }
  type FailState = {
    result: 'fail'
    reason: string
  }
  type LoginState = SuccessState | FailState
  function login2(id: string, password: string): LoginState {
    return {
      result: 'success',
      response: {
        body: 'logged in!',
      },
    }
  }

  function printLoginState(state: LoginState) {
    state.result
    if (state.result === 'success') {
      console.log(`👑 ${state.response.body}`)
    } else {
      console.log(`😭 ${state.reason}`)
    }
  }
}
