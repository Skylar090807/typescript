{
  //getter = readonly
  //setter = writeonly

  class User {
    firstName: string
    lastName: string
    fullName: string
    constructor(firstName: string, lastName: string) {
      //멤버 변수의 데이터 초기화
      this.firstName = firstName
      this.lastName = lastName
      this.fullName = `${firstName} ${lastName}`
    }
  }

  const user = new User('Steve', 'Jobs')
  console.log(user.fullName) // Steve Jobs
  user.firstName = 'Skylar'
  console.log(user.fullName) // Steve Jobs,  fullName이 한번 결정된 뒤로 first,lastName이 변경 되어도 fullName이 계산되지 않는다.
  //한번 할당 되면 계속 지정되어져 있다. 이럴 경우 getter가 유용하게 쓰일 수 있다.

  //getter = readonly
  class User2 {
    // 멤버 변수에 fullName을 get으로 설정해주면 외부에서 first,lastName을 변경 후 fullName에 접근 시 console 창에서 변경된 값을 볼 수 있다.
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`
    }
    private internalAge = 4

    //setter = writeonly
    set age(num: number) {
      if (num < 0) {
        throw new Error('😓 value for beans should be greater than 0')
      }
      this.internalAge
    }
    //아래와 같이 constructor 인자를 private으로 설정할 수도 있고, 멤버변수에서 private 설정할 수도 있다.
    constructor(private firstName: string, private lastName: string) {
      //멤버 변수의 데이터 초기화
      this.firstName = firstName
      this.lastName = lastName
    }
  }

  const user2 = new User2('Alexis', 'Jo')
  //get으로 해도 접근 시엔 일반 멤버 변수처럼 접근.
  console.log(user2.fullName)
  user2.age = 6
  // age = setter 로 writeonly 속성이다. console 창에서 확인 불가.
}
