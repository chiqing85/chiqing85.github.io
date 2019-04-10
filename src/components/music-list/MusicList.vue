<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="material-icons">&#xe5cb;</i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" ref="bgImage">
            <img v-lazy="bgImage" class="bookr-blur">
            <div class="musiclistinfo">
                <div class="album_media">
                    <img :src="bgImage" alt="">
                </div>
                <div class="album__bd">
                    <div class="album__name">
                        <h1 v-html="title"></h1>
                    </div>
                    <div class="tag">
                        标签：<span v-for="tag in MusicList.tags" v-html="tag.name" class="info_tag"></span>
                    </div>
                    <div class="author">
                        <i class="material-icons">&#xe7ff;</i>
                        <span class="author_name" v-html="creator.name"></span>
                    </div>
                    <p class="album">播放量：{{ listennum|line }}</p>
                </div>
            </div>
        </div>
        <div class="disclist">
            <div class="count_desc">
                歌单 <span>共: {{MusicList.songnum}} 首</span>
            </div>
            <div class="desc_play" @click="random">
                <i class="material-icons blue">&#xe039;</i>
            </div>
        </div>
            <div class="scroll">
                <ul>
                    <li v-for="item in MusicList.songlist" class="item">
                        <div class="text">
                            <h2 class="name">
                                <span v-html="item.songname"></span>
                            </h2>
                            <p class="desc">
                                <span>{{ item.singer[0].name}} · {{ item.songname }}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
/* eslint-disable camelcase */

import {getdisc} from '../../api/disc'
import { ERR_OK } from '@/api/config'
import Scroll from '@/layouts/scroll/scroll'
import { getCdlist } from '@/common/js/song'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      MusicList: []
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    listennum: {
      default: ''
    },
    creator: {
      default: ''
    },
    dissid: {
      default: ''
    }
  },
  // 生命钩子
  created () {
    this._getDisc()
  },
  // 加载完成后执行
  mounted () {
    this._scroll()
  },
  // 逻辑/业务处理
  methods: {
    _getDisc () {
     if (!this.dissid) {
        this.$router.push('/recommend')
        return
      }
      getdisc(this.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.MusicList = res.cdlist[0]
        }
      })
    },
    back () {
      this.$router.back()
    },
    _scroll () {
      let h = document.documentElement.clientHeight,
        bg_h = document.querySelector('.bg-image')
      document.querySelector('.scroll').style.height = h - bg_h.clientHeight + 'px'
    },
    random () {
      this.playList({
        list: this._normalizeSongs(this.MusicList.songlist)
      })
    },
    _normalizeSongs(l) {
      let ret = []
      l.forEach(( data) => {
        if(data.songid && data.albummid ) {
          ret.push( getCdlist( data) )
        }
      })
      return ret
    },
    ...mapActions([
      'playList'
    ])
  },
  // 自定义过滤器
  filters: {
    line: (e) => {
      if (!e) return ''
      e = Number(e)
      let unit = ''
      if (e > 9999) {
        e = (e / 10000).toFixed(1)
        unit = '万'
      } else if (e < 9999 > 999) {
        e = (e / 1000).toFixed(2)
        unit = '万'
      }
      return e + unit
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped>
    .recommend-content {
        height: 568px;
        overflow: hidden;
    }
    .music-list {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #fff;
    }
    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        padding: .3rem .4125rem .325rem .475rem;
    }
    .author i {
        height: 1rem;
        font-size: 17px;
        vertical-align: -.15ex;
        fill: currentColor;
    }
    h1.title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        line-height: 40px;
        margin: 0;
        font-size: 90%;
    }
    .bg-image {
        position: relative;
        overflow: hidden;
        margin-top: -2.75rem;
    }
    .bookr-blur {
        position: absolute;
        left: 0;
        width: 100%;
        height: 175vw;
        opacity: .02;
        opacity: calc(.1 + .05);
        -webkit-filter: blur(calc(17px + 1px));
        filter: blur(calc(17px + 1px));
    }
    .musiclistinfo {
        position: relative;
        padding-top: 7rem;
        display: -webkit-box;
        padding-left: 10px;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        -webkit-box-sizing: border-box;
        background: #fff;
        background: -webkit-linear-gradient(bottom,#fff,rgba(255,255,255,0) 108px) no-repeat center bottom;
        background: linear-gradient(to top,#fff,rgba(255,255,255,0) 8rem) no-repeat center bottom;
    }
    .album_media {
        width: 40%;
        border-radius: 2px;
        box-shadow: none;
    }
    .album_media img {
        width: 10rem;
        height: 10rem;
        border-radius: 100%;
    }
    .album__bd {
        position: relative;
        -webkit-box-flex: 1;
        text-align: left;
        margin-left:10px;
    }
    .album__name {
        display: -webkit-box;
        margin: 0;
        width: 170px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        max-height: 47px;
    }
    .album__name h1 {
        font-size: .68rem;
        font-weight: 600;
        line-height: 1.3;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .info_tag {
        margin-right: 10px;
    }
    .disclist {
        margin-top: 15px;
        padding: 0 10px;
        height: 25px;
        text-align: left;
        border-bottom: 1px solid #2ddae8;
    }
    ul,li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li.item {
        display: -webkit-box;
        padding: 5px 20px 0 15px;
        border-bottom: 1px solid #f0f1f2;
    }
    .text {
        position: relative;
        -webkit-box-flex: 1;
        /*display: -webkit-box;*/
        -webkit-box-align: center;
        padding: 10px 0;
        overflow: hidden;
    }
    h2.name {
        display: -webkit-box;
        margin: 0;
        width: 170px;
        font-size: 16px;
        -webkit-box-align: center;
        color: #000;
    }
    h2.name span, p.desc span{
        display: block;
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .count_desc {
        display: inline-block;
    }
    .desc_play {
        float: right;
    }
    p.desc {
        display: -webkit-box;
        margin: 0;
        width: 280px;
        -webkit-box-align: center;
    }
    p.desc span {
        font-size: 80%;
        opacity: .6;
        color: #333;
    }
    .scroll{
        width: 100%;
        overflow-y: scroll;
    }
    i.material-icons.blue {
        color: #2ddae8;
    }
    .disclist::after {
        display: block;
        content: '';
        clear: both;
        visibility: hidden;
    }
    .desc_play {
        float: right;
        line-height: .7;
    }
</style>
