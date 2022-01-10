{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading'
  }

  type SuccessState = {
    state: 'success'
    response: {
      body: string
    }
  }

  type FailState = {
    state: 'fail'
    reason: string
  }

  type ResourceLoadState = LoadingState | SuccessState | FailState

  //code by skylar
  function printLoginState2(loginState: ResourceLoadState) {
    loginState.state
    if (loginState.state === 'loading') {
      console.log('👀 loading...')
    } else if (loginState.state === 'success') {
      console.log('😃 loaded')
    } else if (loginState.state === 'fail') {
      console.log('😱 no network')
    }
  }

  printLoginState2({ state: 'loading' }) // 👀 loading...
  printLoginState2({ state: 'success', response: { body: 'loaded' } }) // 😃 loaded
  printLoginState2({ state: 'fail', reason: 'no network' }) // 😱 no network

  //code by teacher
  function printLoginState3(state: ResourceLoadState) {
    switch (state.state) {
      case 'loading':
        console.log('👀 loading...')
        break
      case 'success':
        console.log(`😃 ${state.response.body}`)
        break
      case 'fail':
        console.log(`😱 ${state.reason}`)
        break
      default:
        throw new Error(`unknown state: ${state}`)
    }
  }

  printLoginState3({ state: 'loading' })
  printLoginState3({ state: 'success', response: { body: 'loaded' } })
  printLoginState3({ state: 'fail', reason: 'no network' })
}
