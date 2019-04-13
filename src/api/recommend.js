import jsonp from '@/common/js/jsonp'
import { commonParams, options} from './config'
import axios from 'axios'

export function getRecommend () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
      data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
      })
  return jsonp(url, data, options)
}

export function getnewList () {
    let data = Object.assign({}, commonParams, {
      platform: 'yqq.json',
      hostUin: 0,
      sin: 0,
      ein: 19,
      sortId: 2,
      needNewCode: 0,
      categoryId: 10000000,
      rnd: Math.random(),
      format: 'json'
    })
  return axios.get('/apiRoutes', {
    params: data
  }).then( (res)=> {
    return res.data
  })
}

export function getDiscList () {
  let data = Object.assign({}, commonParams, {
    format: 'json',
    platform: 'yqq.json',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  })

  return axios.get('/apiRoutes', {
    params: data
  }).then((res) => {
    return res.data
  })
}
