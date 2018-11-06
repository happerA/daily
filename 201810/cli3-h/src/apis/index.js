import axios from 'axios'
const defaultSize = 30
const url ='http://localhost:3000'

export function search(keywords, page=0, limit=defaultSize) {
  return axios.get(`${url}/search`, {
    params: {
      offset: page*limit,
      limit,
      keywords
    }
  })
}
// 排行榜
export function topList() {
  return axios.get(`${url}/toplist/detail`)
}
// 排行榜详情
export function topListDetail(idx) {
  return axios.get(`${url}/toplist/detail`, {
    params: {
      idx
    }
  })
}
// 推荐歌单
export function getPersonalized() {
  return axios.get(`${url}/Personalized`)
}
// 歌单详情
export function listMm(id) {
  return axios.get(`${url}/toplist/detail/mm`, {
    params: {
      id
    }
  })
}

export function playListDetail(id) {
  return axios.get(`${url}/playlist/detail`, {
    params: {
      id
    }
  })
}

export function searchHot() {
  return axios.get(`${url}/search/hot`)
}

export function musicDetail(ids) {
  return axios.get(`${url}/song/detail`, {
    params:{
      ids
    }
  })
}

export function musicUrl(id) {
  return axios.get(`${url}/music/url`, {
    params:{
      id
    }
  })
}

export function lyric(id) {
  return axios.get(`${url}/lyric`, {
    params:{
      id
    }
  })
}
// 评论
export function getComment(id, page=0, limit=defaultSize) {
  return axios.get(`${url}/comment/music`, {
    params: {
      offset: page*limit,
      limit,
      id
    }
  })
}