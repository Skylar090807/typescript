export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void
  removeFrom(parent: HTMLElement): void
  attach(component: Component, position?: InsertPosition): void
}

//Encapsulate the HTML element creation

//generic
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T

  constructor(htmlString: string) {
    const template = document.createElement('template')
    template.innerHTML = htmlString
    this.element = template.content.firstElementChild! as T
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element)
    // https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error('Parent mismatch!')
    }
    parent.removeChild(this.element)
  }

  attach(component: Component, position?: InsertPosition): void {
    component.attachTo(this.element, position)
  }
}
