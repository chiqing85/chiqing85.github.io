import { options} from './config'
import axios from 'axios'

export function getdisc (e) {
  let data = Object.assign({}, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: e,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    notice: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8'
  })

  return axios.get('/apiDisc', {
    params: data
  }).then( (res) => {
    return res.data
  })
}
