{
  //Conditional
  //어떤 타입이 특정 타입일 경우 타입을 결정 해주는 조건적으로 결정.

  type Check<T> = T extends string ? boolean : number
  type Type = Check<string> //boolean

  //TypeScript제공 Conditional예제
  type TypeName<T> = T extends string
    ? 'string'
    : T extends number
    ? 'number'
    : T extends boolean
    ? 'boolean'
    : T extends undefined
    ? 'undefined'
    : T extends Function
    ? 'function'
    : 'object'

  type T0 = TypeName<string>
  ;('string')
  type T1 = TypeName<'a'>
  ;('string')
  type T2 = TypeName<() => void>
  ;('function')
}
