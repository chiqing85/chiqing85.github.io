import {commonParams, options} from './config'
import jsonp from '@/common/js/jsonp'
import axios from 'axios'

export function gethotkey() {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    data = Object.assign({}, commonParams, {
      platform: 'h5',
      uin: 0,
      needNewCode: 1
    })
  return jsonp(url, data, options)
}

export function searchList ( w, p) {
  let data = Object.assign({}, commonParams, {
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    format: 'json',
    platform: 'h5',
    perpage: 20,
    n: 20,
    p,
    w
  })

  return axios.get('/apiSearchList', {
    params: data
  }).then((res) => {
    return res.data
  })
}
