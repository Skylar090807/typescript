import { TextSectionInput } from './components/dialog/input/text-input.js'
import { MediaSectionInput } from './components/dialog/input/media-input.js'
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js'
import { VideoComponent } from './components/page/item/video.js'
import { TodoComponent } from './components/page/item/todo.js'
import { NoteComponent } from './components/page/item/note.js'
import { ImageComponent } from './components/page/item/image.js'
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js'
import { Component } from './components/component.js'

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T
}

class App {
  private readonly page: Component & Composable
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent)
    this.page.attachTo(appRoot)

    // IMAGE
    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url),
    )

    // VIDEO
    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url),
    )

    // NOTE
    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body),
    )

    // TODO
    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body),
    )
  }

  //코드 사용이 계속 중복 될 때 function으로 바꾸는 tip!
  //반복되는 코드를 복사해서 붙여넣고, 다른 점을 찾는다.
  //다른 점만 function의 argument로 받아 온다.

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component,
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement
    element.addEventListener('click', () => {
      const dialog = new InputDialog()
      const input = new InputComponent()
      dialog.addChild(input)
      dialog.attachTo(this.dialogRoot)

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(this.dialogRoot)
      })
      dialog.setOnSubmitListenr(() => {
        const image = makeSection(input)
        this.page.addChild(image)
        dialog.removeFrom(this.dialogRoot)
      })
    })
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body)
