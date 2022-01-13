import { BaseComponent } from '../../component.js'
export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    super(`<section class="note">
          <h2 class="note__title"></h2>
          <p class="note__body"></p>
          </section>`)

    // HTMLHeadElement: HTML의 head 태그를 대표하는 요소
    // HTMLHeadingElement: h1과 같은 heading 태그를 대표하는 요소
    const titleElement = this.element.querySelector('.note__title')! as HTMLHeadingElement
    titleElement.textContent = title

    // HTMLParagraphElement
    // Inherits properties from its parent, HTMLElement.
    // The possible values are "left", "right", "justify", and "center"
    const bodyElement = this.element.querySelector('.note__body')! as HTMLParagraphElement
    bodyElement.textContent = body
  }
}
