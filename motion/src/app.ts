import { MediaSectionInput } from './components/dialog/input/media-input.js'
import { InputDialog } from './components/dialog/dialog.js'
import { VideoComponent } from './components/page/item/video.js'
import { TodoComponent } from './components/page/item/todo.js'
import { NoteComponent } from './components/page/item/note.js'
import { ImageComponent } from './components/page/item/image.js'
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js'
import { Component } from './components/component.js'
import { TextSectionInput } from './components/dialog/input/text-input.js'

class App {
  private readonly page: Component & Composable
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent)
    this.page.attachTo(appRoot)

    //

    // https://youtu.be/XLJKSfOTT80
    // const video = new VideoComponent('Video Title', 'https://youtu.be/XLJKSfOTT80')
    // this.page.addChild(video)

    // const note = new NoteComponent('Note Title', 'Note Body')
    // this.page.addChild(note)

    // const todo = new TodoComponent('Todo Title', 'Todo Item')
    // this.page.addChild(todo)

    const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog()
      const mediaSection = new MediaSectionInput()
      dialog.addChild(mediaSection)
      dialog.attachTo(dialogRoot)

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(dialogRoot)
      })
      dialog.setOnSubmitListenr(() => {
        const image = new ImageComponent(mediaSection.title, mediaSection.url)
        this.page.addChild(image)
        dialog.removeFrom(dialogRoot)
      })
    })

    const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement
    videoBtn.addEventListener('click', () => {
      const dialog = new InputDialog()
      const mediaSection = new MediaSectionInput()
      dialog.addChild(mediaSection)
      dialog.attachTo(dialogRoot)

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(dialogRoot)
      })
      dialog.setOnSubmitListenr(() => {
        const image = new VideoComponent(mediaSection.title, mediaSection.url)
        this.page.addChild(image)
        dialog.removeFrom(dialogRoot)
      })
    })

    const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement
    noteBtn.addEventListener('click', () => {
      const dialog = new InputDialog()
      const mediaSection = new TextSectionInput()
      dialog.addChild(mediaSection)
      dialog.attachTo(dialogRoot)

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(dialogRoot)
      })
      dialog.setOnSubmitListenr(() => {
        const image = new NoteComponent(mediaSection.title, mediaSection.body)
        this.page.addChild(image)
        dialog.removeFrom(dialogRoot)
      })
    })

    const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement
    todoBtn.addEventListener('click', () => {
      const dialog = new InputDialog()
      const mediaSection = new TextSectionInput()
      dialog.addChild(mediaSection)
      dialog.attachTo(dialogRoot)

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(dialogRoot)
      })
      dialog.setOnSubmitListenr(() => {
        const image = new TodoComponent(mediaSection.title, mediaSection.body)
        this.page.addChild(image)
        dialog.removeFrom(dialogRoot)
      })
    })
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body)
