{
  //배열 사용하지 않고 stack 구현하기.
  //hint! 연결 리스트 사용.
  // 이중 연결 리스트 : 정방향과 역방향 모두 가리킬 수 있는 연결 리스트.
  // 연결 리스트는 head가 node를 가리킨다.
  // node는 head가 가리켰던 곳을 가리킨다.

  interface IStack {
    readonly size: number
    push(value: string): void
    pop(): string
  }

  type StackNode = {
    //데이터를 정의할 때 사용자가 데이터를 넣어서 한 단계 감싸는 무언가를 만든다면 불변성을 유지하는 것이 좋다.
    //데이터가 만들어지면 그 데이터가 불변성을 유지할 수 있도록 readonly를 붙여준다.
    readonly value: string
    readonly next?: StackNode
  }

  class StackImpl implements IStack {
    //interface 멤버변수 size의 경우, 구현할 때도 readonly를 하게 되면 값 변경을 할 수 없으므로 제어자를 private으로 지정.
    //외부에서 접근할 수 있도록 getter 사용.

    constructor(private capacity: number) {}
    private _size: number = 0 //내부에서 사용하는 변수를 public도 만들어줄 때 내부에서만 사용하는 변수 이름 앞에 _ 사용
    private head?: StackNode

    get size() {
      return this._size
    }
    push(value: string) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full')
      }

      const node: StackNode = { value: value, next: this.head } //value와 key값이 같을 때 value, 와 같이 작성 가능.
      this.head = node
      this._size++
    }
    pop(): string {
      if (this.head == null) {
        throw new Error('Stack is empty!')
      }
      const node = this.head
      this.head = node.next
      this._size--
      return node.value
    }
  }

  const stack = new StackImpl(10)
  stack.push('Skylar 1')
  stack.push('Alexis 2')
  stack.push('Sophia 3')
  while (stack.size !== 0) {
    console.log(stack.pop())
  }
}
