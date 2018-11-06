class Song {
  constructor({...params}) {
    this.id = params.id
    this.name = params.name
    this.singer = params.singer
    this.album = params.album
    this.image = params.image
    this.duration = params.duration
    this.url = params.url
  }
}
const createSong = (song) => {
  return new Song({
    id: song.id,
    name: song.name,
    singer: song.artists.length > 0&&song.artists.map(singer => singer.name).join('/'),
    album: song.album.name,
    image: song.album.picUrl || null,
    duration: song.duration/1000,
    url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
  })
}
// 格式歌曲
export const formatSongs = (list) => {
  let songs = []
  list.forEach(item => {
    item.id && songs.push(createSong(item))
  })
  return songs
}