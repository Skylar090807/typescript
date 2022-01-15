import { BaseComponent } from './../../component.js'
export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__player"><iframe class="video__iframe"></iframe></div>
            <h3 class="page-item__title video__title"></h3>
        </section>`)

    const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement
    iframe.src = this.convertToEmbeddedURL(url) // url -> videoId -> embed

    // HTMLHeadElement: HTML의 head 태그를 대표하는 요소
    // HTMLHeadingElement: h1과 같은 heading 태그를 대표하는 요소
    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement
    titleElement.textContent = title
  }

  //사용자가 url을 추출해서 가져오는 방법
  // 1.url을 직접 복사
  // https://www.youtube.com/watch?v=XLJKSfOTT80
  // 2. 유튜브 영상 context에서 url copy를 click
  // https://youtu.be/XLJKSfOTT80

  //사용자가 가져온 url을 embed url로 바꾸는 함수 만들기.
  //https://youtu.be/XLJKSfOTT80 -> https://www.youtube.com/embed/XLJKSfOTT80

  //정규표현식 Regex
  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/
    const match = url.match(regExp)
    const videoId = match ? match[1] || match[2] : undefined
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }
}
/*
<iframe 
width="754" 
height="424" 
src="https://www.youtube.com/embed/XLJKSfOTT80" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; 
autoplay; 
clipboard-write; 
encrypted-media; 
gyroscope; 
picture-in-picture" 
allowfullscreen>
</iframe>
*/
