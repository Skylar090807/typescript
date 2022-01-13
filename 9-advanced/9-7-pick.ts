{
  //Pick
  //기존 타입 중 전달된 데이터 내에서 원하는 데이터만 뽑아서 사용.

  //Pick은 TypeScript 제공 utility type
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }

  type Video = {
    id: string
    title: string
    url: string
    data: string
  }

  type VideoMetadata = Pick<Video, 'id' | 'title'>

  function getVideos(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'http://..',
      data: 'byte-data..',
    }
  }

  function getVideoMetadatas(id: string): VideoMetadata {
    return {
      id,
      title: 'title',
    }
  }
}
