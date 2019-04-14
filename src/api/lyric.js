import axios from 'axios'
import { commonParams} from './config'

export default function getLyric( mid ) {

  let data = Object.assign( {}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: + new Date(),
    format: 'json'
  })
  return axios.get('/apilyric', {
    params: data
  }).then( (res) => {
    return res.data
  })
}

