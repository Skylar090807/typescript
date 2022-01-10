{
  //Enum
  //JavaScript에는 Enum을 제공하지 않고 TypeScript에서만 제공한다.

  //JavaScript에서는 상수를 정의할 때 보통 한 번 정해지면 바뀌지 않고, 대문자 형태로 사용한다.
  const MAX_NUM = 6
  const MAX_STUDENTS_PER_CLASS = 10
  const MONDAY = 0
  const TUESDAY = 1
  const WEDNESDAY = 2
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 })
  const dayOfday = DAYS_ENUM.MONDAY

  //TypeScript
  //enum
  //관련된 상수 값이 있다면 enum으로 묶어서 상수 값을 관리할 수 있다.
  enum Days { //TypeScript 에서는 첫 글자만 대문자로 작성.
    Monday = 1, // Monday = 1을 따로 지정해주지 않으면 0부터 자동으로 지정된다. 문자열을 할당할 수 있고 문자열의 경우 자동으로 지정될 수 없기에 하나씩 작성해야 한다.
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Satarday,
    Sunday,
  }
  console.log(Days.Tuesday)
  const day = Days.Satarday
  console.log(day)

  //가능한 enum은 사용하지 않는 것이 좋다.
  let yoil: Days = Days.Monday
  yoil = Days.Wednesday
  yoil = 10 // 상관 없는 수를 지정해도 에러가 발생하지 않는다.
  console.log(yoil)

  //type이 불분명해지는 enum보다는 Union을 쓰는 것이 좋다.
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday'
  let dayOfWeek: DaysOfWeek = 'Monday'
  // dayOfWeek = 'skylar' //상관 없는 문자열을 지정하면 에러가 발생한다.
  dayOfWeek = 'Tuesday' // Union에 지정해 둔 것 중 하나만 지정할 수 있다.
}
