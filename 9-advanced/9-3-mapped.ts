{
  //Mapped Type 🟣

  type Video = {
    title: string
    author: string
  }

  // type VideoOptional = {
  //   title? : string
  //   author? : string
  // }

  // type VideoReadOnly = {
  //   readonly title: string
  //   readonly author: string
  // }

  // type Video를 optional, readonly 로 만들고 싶다면 각각 작성해줘야 하지만
  // mapped type을 이용하면 좀 더 간편하게 해볼 수 있다.
  ;[1, 2].map((item) => item * item) //[1, 4]
  //숫자 배열이 있다면 .map을 이용해서 다른 배열 형태로 변환하는 것이 가능한 것 처럼
  //mapped type을 활용하면 기존 type을 다른 형태로 변환할 수 있다.

  //mapped type 으로 optional 만들기 🟣
  //type을 generic으로 두고,
  //index [] 기호를 사용하면 키를 하나하나씩 돌 수 있다.
  // for...in(object에 있는 모든 key들을 하나하나 빙글빙글 도는 연산자)을 썼을 때와 동일.
  type Optional<T> = {
    [P in keyof T]?: T[P]
    //T에 있는 모든 key들을 순차적으로 P에 할당하고, P의 key들은 optional이 되며 P값의 타입을 맵핑해서 만들어준다.
  }

  type VideoOptional = Optional<Video>
  //Optional에 전달된 Video는 Video의 키들을 빙글빙글 돌면서 title을 optional로 만들고
  //title의 value type은 string.
  //title: string -> title?: string
  //다음 key인 author를 optional로 만들고 optional의 value는 string.
  //author: string -> author? : string

  const videoOp: VideoOptional = {
    //optional이기 때문에 Video의 key들을 넣어도 되고, 안 넣어도 됨.
    //다만 Video에 없는 key를 넣으면 에러.
  }

  //mapped type을 이용하면 재사용성이 높아진다.

  type Animal = {
    name: string
    age: number
  }

  //type으로 전달하지 않고 사용하면서 바로 Optional에 전달해서 사용할 수 있다.
  const animal: Optional<Animal> = {
    name: 'dog',
    age: 1,
  }
  animal.name = 'cat'

  //mapped type으로 readonly 만들기 🟣
  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P]
  }

  const videoReadonly: ReadOnly<Video> = {
    title: 'hi',
    author: 'skylar',
  }
  // videoReadonly.author = 'Shphia' //readonly가 되었기 때문에 error 발생.

  // mapped type null허용🟣
  type Nullable<T> = { [P in keyof T]: T[P] | null }
  const obj2: Nullable<Video> = {
    title: null,
    author: null,
  }

  //TypeScript제공 Mapped Type 예시
  type Proxy<T> = {
    get(): T
    set(value: T): void
  }
  type Proxyfy<T> = {
    [P in keyof T]: Proxy<T[P]>
  }
}
