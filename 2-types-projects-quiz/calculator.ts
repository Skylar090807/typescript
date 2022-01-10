/**
 * Let's make a calculator 🧮
 */

// code by skylar
type Perform = 'add' | 'subtract' | 'multiply' | 'divide' | 'remainder'

function calculate(perform: Perform, num1: number, num2: number) {
  if (perform === 'add') {
    return num1 + num2
  } else if (perform === 'subtract') {
    return num1 - num2
  } else if (perform === 'multiply') {
    return num1 * num2
  } else if (perform === 'divide') {
    return num1 / num2
  } else if (perform === 'remainder') {
    return num1 % num2
  }
}

console.log(calculate('add', 1, 3)) // 1 + 3 = 4
console.log(calculate('subtract', 3, 1)) // 3 - 1 = 2
console.log(calculate('multiply', 4, 2)) // 4 * 2 = 8
console.log(calculate('divide', 4, 2)) // 4 / 2 = 2
console.log(calculate('remainder', 5, 2)) // 5 % 2 = 1

//code by teacher
type Command = 'add' | 'subtract' | 'multiply' | 'divide' | 'remainder'

function calculate2(command: Command, a: number, b: number) {
  switch (command) {
    case 'add':
      return a + b
    case 'subtract':
      return a - b
    case 'multiply':
      return a * b
    case 'divide':
      return a / b
    case 'remainder':
      return a % b
    default:
      throw new Error('unknown command')
  }
}

console.log(calculate2('add', 1, 3)) // 1 + 3 = 4
console.log(calculate2('subtract', 3, 1)) // 3 - 1 = 2
console.log(calculate2('multiply', 4, 2)) // 4 * 2 = 8
console.log(calculate2('divide', 4, 2)) // 4 / 2 = 2
console.log(calculate2('remainder', 5, 2)) // 5 % 2 = 1
