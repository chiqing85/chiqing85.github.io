import jsonp from '@/common/js/jsonp'
import { commonParams, options} from './config'
import axios from 'axios'

export function getSingerList ( a, g, s) {
  let data = JSON.stringify({
      comm: {
        ct: 24,
        cv: 0
      },
      singerList: {
        module: "Music.SingerListServer",
        method: "get_singer_list",
        param: {
          area: a,
          sex: s,
          genre: g,
          index: -100,
          sin: 0,
          cur_page: 1
        }
      }
    }),

  datas = Object.assign({}, commonParams, {
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    hostUin: 0,
    loginUin: 0,
    data
    })

  return axios.get('/apiSinger', {
    params: datas
  }).then( (res) => {
    return res.data
  })
}

export function getSingerDetail ( mid ) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
    data = Object.assign({}, commonParams, {
      format: 'json',
      platform: 'yqq',
      ct: 24,
      singermid: mid,
      order: 'listen',
      begin: 0,
      uin: 0,
      num: 50,
    })
  return jsonp(url, data, options)
}
