<template>
  <div class="recommend" ref="recommend">
      <scroll class="recommend-content" ref="scroll">
        <div>
            <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
              <slider>
                <div v-for="item in recommends">
                    <a :href="item.linkUrl">
                        <img class="needsclick" :src="item.picUrl">
                    </a>
                </div>
              </slider>
            </div>
            <div class="disclist">
                <h1 class="list-title">歌单</h1>
                <div class="tr_new">
                    <span :class="active == 0 ? 'active': ''" @click="_getDiscList(0)">推荐</span>
                    <span :class="active == 1 ? 'active': ''" @click="_getnewList(1)">最新</span>
                </div>
            </div>
            <ul>
              <li @click="selectItem(item)" v-for="item in DiscList" class="item">
                <div class="icon">
                    <img v-lazy="item.imgurl" :key="item.imgurl" width="60">
                </div>
                <div class="text">
                    <h2 class="name" v-html="item.creator.name"></h2>
                    <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
        <div class="cfix" v-if="!this.$store.state.fullScreen"></div>
        </div>
      </scroll>
      <router-view/>
  </div>
</template>

<script>
import { getRecommend, getDiscList, getnewList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import Scroll from '@/layouts/scroll/scroll'
import Slider from '@/layouts/slider/slider'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      recommends: [],
      DiscList: [],
      active: -1
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList (e = 0) {
      this.active = e
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.DiscList = res.data.list
        }
      })
    },
    _getnewList (e) {
      this.active = e
      getnewList().then((res) => {
        if (res.code === ERR_OK) {
          this.DiscList = res.data.list
        }
      })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll
  }
}
</script>

<style scoped>
    .recommend {
        position: absolute;
        width: 100%;
        top: 41px;
        bottom: 0;
        overflow-y: scroll;
    }
    .recommend-content {
        height: 100%;
        overflow: hidden;
    }
    .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .disclist {
        height: 50px;
        margin-left: 10px;
    }
    .list-title,.tr_new{
        display: inline-block;
        font-size: 14px;
    }
    .list-title {
        float: left;
        padding-left: 5px;
        font-weight: bold;
        border-left: 3px solid #68dae8;
    }
    .tr_new {
        float: right;
        margin: 20px 10px 10px 0;
        line-height: 1.1
    }
    .tr_new span {
        padding: 0 5px;
    }
    .tr_new span.active {
        font-weight: bold;
        color: #ff8e99;
    }
    ul,li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 5px 20px 15px 20px;
        border-bottom: 1px solid #f0f1f2;
    }
    .icon {
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
    }
    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: 14px;
        text-align: left;
        margin-left: 10px;
    }
    .name{
        font-size: 12px;
        margin-bottom: 10px;
        color: #000;
    }
    .desc {
        font-size: 80%;
        opacity: .6;
        color: #333;
    }
</style>
