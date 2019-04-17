import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/search/search'
Vue.use(Router)

const Recommend = () => import( '@/components/rectommend/recommend')
const Disc = () => import( '@/components/disc/dics')
const Singer = () => import(  '@/components/singer/singer' )
const SingerInfo = () => import(  '@/components/singer/singerinfo' )
const Rank = () => import( '@/components/rank/rank' )
const RankList = () => import( '@/components/rank/ranklist' )

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
