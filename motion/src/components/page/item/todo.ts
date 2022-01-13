import { BaseComponent } from '../../component.js'
export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`<section class="todo">
          <h2 class="todo__title"></h2>
          <input type="checkbox" class="todo-checkbox" />
          </section>`)

    // HTMLHeadElement: HTML의 head 태그를 대표하는 요소
    // HTMLHeadingElement: h1과 같은 heading 태그를 대표하는 요소
    const titleElement = this.element.querySelector('.todo__title')! as HTMLHeadingElement
    titleElement.textContent = title

    // HTMLParagraphElement
    // Inherits properties from its parent, HTMLElement.
    // The possible values are "left", "right", "justify", and "center"
    const todoElement = this.element.querySelector('.todo-checkbox')! as HTMLParagraphElement
    todoElement.insertAdjacentText('afterend', todo)
  }
}
