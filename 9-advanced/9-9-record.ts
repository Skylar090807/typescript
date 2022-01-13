{
  //record
  //Record는 TypeScript제공 utility type
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }

  //map과 비슷하게 하나와 어떤 하나를 연결하고 싶을 때,
  //하나를 key로 쓰고 나머지를 다른 타입으로 묶고 싶을 때 유용하게 쓸 수 있다.

  type PageInfo = {
    title: string
  }
  type Page = 'home' | 'about' | 'contact'

  const nav: Record<Page, PageInfo> = {
    home: { title: 'Home' },
    about: { title: 'About' },
    contact: { title: 'Contact' },
  }

  //Capialize는 TypeScript제공 utility type
  type Capitalize<S extends string> = intrinsic
  type Product = 'cat' | 'dog'
  type NewProduct = Capitalize<Product> //'Cat' | 'Dog'
}
