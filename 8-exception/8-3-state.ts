{
  type SuccesState = {
    result: 'success'
  }
  type NetworkErrorState = {
    result: 'fail'
    reason: 'offline' | 'down' | 'timeout'
  }

  //Union 사용
  type ResultState = SuccesState | NetworkErrorState

  class NetworkClient {
    tryConnect(): ResultState {
      return {
        result: 'fail',
        reason: 'down',
      }
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}
    login() {
      return this.client.tryConnect()
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try {
        const returnData = this.userService.login()
        if (returnData.result === 'success') {
          console.log('login success')
        } else {
          if (returnData.result === 'fail') {
            console.log(`login fail: ${returnData.reason}`)
          } else {
            console.log(`not Network Error`)
          }
        }
      } catch (error) {}
    }
  }

  const client = new NetworkClient()
  const service = new UserService(client)
  const app = new App(service)
  app.run()
}
