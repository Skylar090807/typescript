{
    var StackImpl = /** @class */ (function () {
        //interface 멤버변수 size의 경우, 구현할 때도 readonly를 하게 되면 값 변경을 할 수 없으므로 제어자를 private으로 지정.
        //외부에서 접근할 수 있도록 getter 사용.
        function StackImpl(capacity) {
            this.capacity = capacity;
            this._size = 0; //내부에서 사용하는 변수를 public도 만들어줄 때 내부에서만 사용하는 변수 이름 앞에 _ 사용
        }
        Object.defineProperty(StackImpl.prototype, "size", {
            get: function () {
                return this._size;
            },
            enumerable: false,
            configurable: true
        });
        StackImpl.prototype.push = function (value) {
            if (this.size === this.capacity) {
                throw new Error('Stack is full');
            }
            var node = { value: value, next: this.head }; //value와 key값이 같을 때 value, 와 같이 작성 가능.
            this.head = node;
            this._size++;
        };
        StackImpl.prototype.pop = function () {
            if (this.head == null) {
                throw new Error('Stack is empty!');
            }
            var node = this.head;
            this.head = node.next;
            this._size--;
            return node.value;
        };
        return StackImpl;
    }());
    var stack = new StackImpl(10);
    stack.push('Skylar 1');
    stack.push('Alexis 2');
    stack.push('Sophia 3');
    while (stack.size !== 0) {
        console.log(stack.pop());
    }
}
