export default class Song{
  constructor ({id, mid, singer, name, albumname, interval, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.albumname = albumname
    this.interval = interval
    this.image = image
    this.url = url
  }
}

export function getCdlist ( d ) {
  return  new Song( {
    id:d.songid|| d.mid,
    mid: d.songmid || d.singerMid,
    singer: Singer( d.singer),
    name: d.songname || d.name,
    albumname: d.albumname || d.album.name,
    interval: d.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${d.albummid||d.album.mid}.jpg?max_age=2592000`,
    url: `https://api.bzqll.com/music/tencent/url?key=579621905&id=${d.songmid || d.mid}&br=320`

      // `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${songVkey}`
  })
}

export function Singer ( s ) {
  let r = []
  if( !s ) {
    return ''
  }
  s.forEach( (res) => {
    r.push( res.name)
  })
  return r.join(' / ')
}
