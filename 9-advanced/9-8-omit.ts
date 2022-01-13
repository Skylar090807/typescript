{
  //Omit 생략
  //Pick과 반대되는 개념으로 기존 타입 중 전달된 데이터 내에서 제외하고 싶은 데이터만 뽑아서 생략.
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
  type Exclude<T, U> = T extends U ? never : T

  type Video = {
    id: string
    title: string
    url: string
    data: string
  }

  //Omit은 extends keyof any이므로 기존 데이터에 없는 새로운 데이터를 추가해 생략시킬 수 있다.
  type VideoMetadata = Omit<Video, 'url' | 'data' | 'star'>

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'http://..',
      data: 'byte-data..',
    }
  }

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id,
      title: 'title',
    }
  }
}
