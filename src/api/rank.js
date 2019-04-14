import jsonp from '@/common/js/jsonp'
import { commonParams, options} from './config'
import axios from 'axios'

export function getRank () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    data = Object.assign({}, commonParams, {
      platform: 'h5',
      uin: 0,
      needNewCode: 1
    })
  return jsonp(url, data, options)
}

export function gettoplist ( id ) {

  let t = new Date(),
    m = (t.getMonth() + 1) <= 9 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1),
    time = t.getFullYear() + '-' + m + '-' + t.getDate(),
    datastor = JSON.stringify ({
        detail: {
          module: 'musicToplist.ToplistInfoServer',
          method: 'GetDetail',
          param: {
            topId: id,
            offset: 0,
            num: 20
          }
        },
        comm: {
          ct: 24,
          cv: 0
        } } ),

    data = Object.assign({}, commonParams, {
      data: datastor,
    })

    /*data = JSON.stringify( {
      req_0: {
        module: "CDN.SrfCdnDispatchServer",
        method: 'GetCdnDispatch',
        param: {}
      },
      req_1: { module: "track_info.UniformRuleCtrlServer", method: "GetTrackInfo",
        param: {
            topId: id,
            offset: 0,
            num: 20,
            period: time
        /!* ids: Array(
           231282176,231031205,230907208,449201,231031206,231047975,231062643,231030978,229627366,231031204,214078408,230902894,231030979,231048877,230956311,105091208,213914525,5445223,231258800,231287862,230972660,229661472,230981517,101787873,230393521,213932825,105907470,231030982,228053309,230950305,231046608,231047940,214713398,217873869,231086095,107192080,230973317,231048856,231258303,5460899,231030485,231009393,231046605,231046606,231048894,214981973,203504622,227999081,5244390,231007992
         ),
          types: Array(
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
          )*!/
        }
      },
      comm: {
        g_tk:5381,
        uin:0,
        format:"json",
        ct: 23,
        cv: 0
      }
    })*/

    return axios.get( '/apiTopList',
      {
        params: data
      }
      ).then( (res) => {
    return res.data
  })
}


