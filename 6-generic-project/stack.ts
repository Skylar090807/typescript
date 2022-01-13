{
  //4-oop-project를 generic으로 만들기.

  interface IStack<T> {
    readonly size: number
    push(value: T): void
    pop(): T
  }

  type StackNode<T> = {
    readonly value: T
    readonly next?: StackNode<T>
  }

  class StackImpl<T> implements IStack<T> {
    constructor(private capacity: number) {}
    private _size: number = 0
    private head?: StackNode<T>

    get size() {
      return this._size
    }
    push(value: T) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full')
      }

      const node: StackNode<T> = { value: value, next: this.head }
      this.head = node
      this._size++
    }
    pop(): T {
      if (this.head == null) {
        throw new Error('Stack is empty!')
      }
      const node = this.head
      this.head = node.next
      this._size--
      return node.value
    }
  }

  const stack = new StackImpl<string>(10)
  stack.push('Skylar 1')
  stack.push('Alexis 2')
  stack.push('Sophia 3')
  while (stack.size !== 0) {
    console.log(stack.pop())
  }

  const stack2 = new StackImpl<number>(10)
  stack2.push(123)
  stack2.push(234)
  stack2.push(345)
  while (stack2.size !== 0) {
    console.log(stack2.pop())
  }
}
