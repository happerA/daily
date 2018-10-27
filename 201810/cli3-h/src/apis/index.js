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