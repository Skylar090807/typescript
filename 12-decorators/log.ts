//Decorators
//Decorators를 이용하면 기존의 함수나 클래스를 한 단계 감싸서 꾸며줄 수 있는 wrapper function, wrapper class를 만들 수 있다.

function Log(_: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const newDescriptor = {
    ...descriptor,
    value: function (...args: any[]): any {
      console.log(`Calling ${name} with arguments:`)
      console.dir(args)
      const result = descriptor.value.apply(this, args)
      console.log(`Result:`)
      console.dir(result)
      return result
    },
  }

  return newDescriptor
}

class Calculator {
  @Log // Decorators 사용: @Log annotation을 이용하여 사용한다.
  // Experimental support for decorators is a feature that is subject to change in a future release.
  // Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.
  add(x: number, y: number): number {
    return x + y
  }
}

const calculator = new Calculator()
console.log(calculator.add(1, 2))
