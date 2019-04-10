<template>
    <div class="player" v-show="playList.length > 0">
        <div class="back" @click="back">
            <i class="material-icons">&#xe5cb;</i>
        </div>
        <div class="title">
            <h1 v-html="currentSong.name"></h1>
            <span v-html="currentSong.singer"></span>
        </div>
        <div class="bgimage">
            <img :src="currentSong.image" class="bookr-blur">
            <div class="middle">
                <!-- 封面 -->
                <div class="cd_wrap">
                    <div :class="pause">
                        <img :src="currentSong.image" alt="">
                    </div>
                </div>
                <!-- 歌词 -->
                <div class="lyric_wrap">
                    <div class="lyric" v-html="lyrictext"></div>
                </div>
                <div class="bottom">
                    <div class="play_top">
                        <i class="glyphicon glyphicon-random micons"></i>
                        <i class="material-icons">&#xe87e;</i>
                        <i class="material-icons">&#xe050;</i>
                    </div>
                    <div class="play_progress">
                        <div class="progress">
                            <div class="progress-bar progress-bar-success" role="progressbar"
                                 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                 :style="{width: progressw + '%'}">
                            </div>
                            <div class="progress-dot" :style="{left: progressw + '%' }"></div>
                        </div>
                        <div class="progress-l" v-html="seconds( currentTime) "></div>
                        <div class="progress-r" v-html="seconds( currentSong.interval )"></div>
                    </div>
                    <div class="operators">
                        <i class="material-icons">&#xe020;</i>
                        <i class="material-icons play_volume" @click="play" v-html="playicon"></i>
                        <i class="material-icons">&#xe01f;</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import getLyric from '@/api/lyric'
import { ERR_OK } from '@/api/config'
import {Base64 } from 'js-base64'
import Lyric from 'lyric-parser'

  export default {
  data() {
    return {
        audio : {},
        currentTime: 0,
        progressw: 0,
        currentLyric: null,
        lyrictext: ''
    }
  },
    mounted() {
        this.audio = new Audio();
    },
    computed: {
      playicon() {
        return this.playstatus ? '&#xe036' : '&#xe039;'
      },
      pause() {
        return this.playstatus ? 'cd play' : 'cd play pause'
      },
      playList() {
        return this.playList
      },
      ...mapGetters([
        "playList",
        'currentSong',
        'playstatus'
      ])
    },
    methods: {
      back () {
        this.$router.back()
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      seconds(e) {
        e = e | 0
        const minute = e / 60 | 0
        const second = this._pad(e % 60)
        return `${minute}:${second}`
      },
      play() {
        this.setPlaystatusState( !this.playstatus )
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      _getLyric() {
        getLyric( this.currentSong.mid ).then( (res) => {
          if(res.code == ERR_OK) {
            let lyric =   Base64.decode( res.lyric )
            this.currentLyric = new Lyric(lyric, this.scrollLyric)
            if( this.playstatus ) {
              this.currentLyric.play()
            }
          } else {
            this.lyrictext = '哦！悲剧勒，没有找到歌词！'
          }
        })
      },
      scrollLyric( {lineNum, txt} ) {

        this.lyrictext = txt
      },
      ...mapMutations({
        setPlaystatusState: 'SET_PLAYSTATUS'
      }),
    },
    watch:{
      currentSong( n, o) {
        if( this.playstatus ) {
          let curl = this.currentSong.url
          this.audio = new Audio( curl );
          this.audio.volume = .5
          this._getLyric()
        }
      },
      playstatus ( n ) {
        let audio = this.audio
        n ? audio.play() : audio.pause()
        setInterval(() => {
          this.currentTime = audio.currentTime
          this.progressw =  (this.currentTime / this.currentSong.interval) * 100
        }, 1000)

      }
    }
  }
</script>

<style scoped>
    .player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: #fff;
        overflow-y: scroll;
    }
    .back {
        position: absolute;
        height: 40px;
        line-height: 40px;
        padding: .3rem .4125rem .325rem .475rem;
    }
    .back i {
        height: 1rem;
        font-size: 17px;
        vertical-align: -.15ex;
        fill: currentColor;
    }
    .title {
        position: absolute;
        left: 10%;
        top: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .title h1 {
        margin: 0;
        font-size: 15px;
    }
    .title span {
        font-size: 80%;
        opacity: .6;
        color: #333;
    }
    .bookr-blur {
        position: fixed;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .02;
        opacity: calc(.1 + .05);
        -webkit-filter: blur(17px);
        filter: blur(calc(17px));
    }
    .bgimage {
        overflow: hidden;
    }
    .middle {
        position: absolute;
        width: 100%;
        margin: 80px auto 10px;
        white-space: nowrap;
        overflow: hidden;
    }
    .cd {
        margin: 0 auto;
        width: 21rem;
        height: 21rem;
        box-sizing: border-box;
        border: 2px solid #fff;
        border-radius: 50%;
    }
    .cd.play {
        animation: rotate 20s linear infinite;
    }
    .cd.pause {
        animation-play-state: paused;
    }
    .cd img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .cd::after, .cd::before {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        content: "";
        border-radius: 50%;
    }
    .cd::before {
        width: 48px;
        height: 48px;
        background: #ffffffe0;
        border: 3px solid #1f1f1f;
        z-index: 10;
    }
    .cd::after {
        width: 53px;
        height: 53px;
        border: 5px solid #fff;
        z-index: 11;
    }
    .lyric_wrap {
        width: 80%;
        margin: 30px auto 0 auto;
        overflow: hidden;
        text-align: center;
    }
    .lyric {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #00000080;
    }
    .micons {
        font-size: 24px;
        display: inline-block;
        line-height: 100%;
    }
    .play_top {
        display: flex;
        margin: 30px auto 0;
    }
    .play_top i {
        width: 33.3%;
        float: left;
        font-size: 16px;

    }
    .play_progress {
        position: relative;
        width: 95%;
        margin: 30px auto;
    }
    .progress {
        margin: 0;
        height: 4px;
    }
    .progress-bar {
        height: 4px;
        background: #00b7f8;
    }
    .progress-l {
        float: left;
    }
    .progress-r {
        float: right;
    }
    .operators {
        display: flex;
        width: 75%;
        margin: 0 auto;
    }
    .operators i {
        width: 33.3%;
        float: left;
        font-size: 25px;
        line-height: 50px;
        color: #00b7f8;
    }
    i.play_volume {
        font-size: 50px;
    }
    .progress-dot {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
        margin-left: -3px;
        margin-top: -3px;
        transition: all 0.25s ease;
        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        -ms-transition: all 0.25s ease;
        -webkit-box-shadow: 0 0 1px 4px #00b7f8;
        box-shadow: 0 0 1px 4px #00b7f8;
    }
    @-webkit-keyframes rotate{
        0%{-webkit-transform:rotate(0deg);}
        100%{-webkit-transform:rotate(360deg);}
    }
</style>
