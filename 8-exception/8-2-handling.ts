{
  {
    class TimeoutError extends Error {}
    class OfflineError extends Error {}

    class NetworkClient {
      tryConnect(): void {
        throw new Error('no network!')
      }
    }

    class UserService {
      constructor(private client: NetworkClient) {}
      login() {
        this.client.tryConnect()
      }
    }

    class App {
      constructor(private userService: UserService) {}
      run() {
        try {
          this.userService.login()
        } catch (error) {
          //catch로 error를 받는 순간 any type이 된다.
          //show dialog to user
          // if(error instanceof OfflineError){
          // }
        }
      }
    }

    const client = new NetworkClient()
    const service = new UserService(client)
    const app = new App(service)
    app.run()
  }
}
