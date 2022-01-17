import { Hoverable, Droppable } from './../common/type'
import { EnableDragging, EnableDrop, EnableHover } from '../../decorators/draggable.js'
import { Draggable } from '../common/type.js'
import { BaseComponent, Component } from './../component.js'

export interface Composable {
  addChild(child: Component): void
}
type OnCloseListener = () => void
type DragState = 'start' | 'stop' | 'enter' | 'leave'
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void

interface SectionContainer extends Component, Composable, Draggable, Hoverable {
  setOnCloseListener(listener: OnCloseListener): void
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void
  muteChildren(state: 'mute' | 'unmute'): void
  getBoundingRect(): DOMRect
  onDropped(): void
}

type SectionContainerConstructor = {
  new (): SectionContainer
}

@EnableDragging
@EnableHover
export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener
  private dragStateListener?: OnDragStateListener<PageItemComponent>

  constructor() {
    // &times; = x (HTML Entity)
    //drag and drop -> draggable= "true"
    super(`<li draggable="true" class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`)
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener()
    }

    //drag and drop -> 하나씩 event 처리했던 것들을 Decorators 적용하기 위해서 주석 처리!!
    // this.element.addEventListener('dragstart', (event: DragEvent) => {
    //   this.onDragStart(event)
    // })
    // this.element.addEventListener('dragend', (event: DragEvent) => {
    //   this.onDragEnd(event)
    // })
    // this.element.addEventListener('dragenter', (event: DragEvent) => {
    //   this.onDragEnter(event)
    // })
    // this.element.addEventListener('dragleave', (event: DragEvent) => {
    //   this.onDragLeave(event)
    // })
  }

  //drag and drop
  // _ 사용하지 않을 때 언더 바 작성해줌
  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start')
    //css 위한 class 생성
    this.element.classList.add('lifted')
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop')
    //css 위한 class 삭제
    this.element.classList.remove('lifted')
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter')
    //css 위한 class 생성
    this.element.classList.add('drop-area')
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave')
    //css 위한 class 삭제
    this.element.classList.remove('drop-area')
  }

  onDropped() {
    //target이 dropped라고 알려주고 class 삭제
    this.element.classList.remove('drop-area')
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state)
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement
    child.attachTo(container)
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener
  }
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener
  }

  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-children')
    } else {
      this.element.classList.remove('mute-children')
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect()
  }
}

@EnableDrop
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable, Droppable {
  // map은 중복된 data를 가질 수 있지만, set은 중복된 data를 가질 수 없다.
  private children = new Set<SectionContainer>()
  private dragTarget?: SectionContainer
  private dropTarget?: SectionContainer

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>')
    // Drag and Drop -> Decorators 적용하기 위해서 주석 처리!!
    // this.element.addEventListener('dragover', (event: DragEvent) => {
    //   this.onDragOver(event)
    // })
    // this.element.addEventListener('drop', (event: DragEvent) => {
    //   this.onDrop(event)
    // })
  }

  // drop event가 일어났을 때 event.preventDefault()를 호출해준다.
  // 각 핸들러는 preventDefault() 를 호출해 추가적인 이벤트 (터치 이벤트나 포인터 이벤트) 가 일어나지 않도록 한다.
  // onDragOver(event: DragEvent) { //Decorators 적용하기 위해서 주석 처리!!
  //   event.preventDefault()
  //   console.log('onDragOver')
  // }

  onDragOver(_: DragEvent): void {}
  onDrop(event: DragEvent) {
    // console.log('onDrop', this.dropTarget)

    // event.preventDefault() //Decorators 적용하기 위해서 주석 처리!!
    //위치 바꿔주기
    if (!this.dropTarget) {
      return
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY
      const srcElement = this.dragTarget.getBoundingRect()

      this.dragTarget.removeFrom(this.element)
      this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend')
    }
    this.dropTarget.onDropped()
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor()
    item.addChild(section)
    item.attachTo(this.element, 'beforeend')
    item.setOnCloseListener(() => {
      item.removeFrom(this.element)
      this.children.delete(item)
    })
    this.children.add(item)
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target
          this.updateSections('mute')
          break
        case 'stop':
          this.dragTarget = undefined
          this.updateSections('unmute')
          break
        case 'enter':
          console.log('enter', target)

          this.dropTarget = target
          break
        case 'leave':
          console.log('leave', target)
          this.dropTarget = undefined
          break
        default:
          throw new Error(`unsupported state: ${state}`)
      }
    })
  }

  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state)
    })
  }
}
