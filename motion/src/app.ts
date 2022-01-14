import { InputDialog } from './components/dialog/dialog.js'
import { VideoComponent } from './components/page/item/video.js'
import { TodoComponent } from './components/page/item/todo.js'
import { NoteComponent } from './components/page/item/note.js'
import { ImageComponent } from './components/page/item/image.js'
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js'
import { Component } from './components/component.js'

class App {
  private readonly page: Component & Composable
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent)
    this.page.attachTo(appRoot)

    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300')
    this.page.addChild(image)

    // https://youtu.be/XLJKSfOTT80
    const video = new VideoComponent('Video Title', 'https://youtu.be/XLJKSfOTT80')
    this.page.addChild(video)

    const note = new NoteComponent('Note Title', 'Note Body')
    this.page.addChild(note)

    const todo = new TodoComponent('Todo Title', 'Todo Item')
    this.page.addChild(todo)

    const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog()

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(document.body)
      })
      dialog.setOnSubmitListenr(() => {
        //make section, add in page.ts
        dialog.removeFrom(document.body)
      })

      dialog.attachTo(document.body)
    })
  }
}

new App(document.querySelector('.document')! as HTMLElement)
