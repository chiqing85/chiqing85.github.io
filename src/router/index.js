import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/rectommend/recommend'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import Disc from '@/components/disc/dics'
import RankList from '@/components/rank/ranklist'
import SingerInfo from '@/components/singer/singerinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerInfo
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankList
        }
      ]
    }
  ]
})
