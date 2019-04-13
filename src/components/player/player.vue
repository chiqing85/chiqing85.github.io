<template>
    <div class="player" v-show="playList.length > 0">
        <div class="fullScreen" v-show="fullScreen">
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
                            <i class="material-icons" @click="PlayMuteds" v-html="volume"></i>
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
                            <i class="material-icons" @click="playprev">&#xe020;</i>
                            <i class="material-icons play_volume" @click="play" v-html="playicon"></i>
                            <i class="material-icons" @click="playnext">&#xe01f;</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="minplay" v-show="!fullScreen" @click="open">
            <div class="min_cd_wrap">
                <img :src="currentSong.image" alt="">
            </div>
            <div class="min_info">
                <div class="min_info_title">
                    <div class="min_title">
                        <h1 v-html="currentSong.name"></h1>
                        <span v-html="currentSong.singer"></span>
                    </div>
                    <div class="min_progress"> {{ seconds( currentTime)}} / {{ seconds(currentSong.interval) }}</div>
                </div>
                <!-- 进度条 -->
                <div class="play_progress">
                    <div class="progress">
                        <div class="progress-bar progress-bar-success" role="progressbar"
                             aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                             :style="{width: progressw + '%'}">
                        </div>
                        <div class="progress-dot" :style="{left: progressw + '%' }"></div>
                    </div>
                </div>
            </div>
            <div class="min_operators" @click.stop="play">
                <i class="material-icons play_volume" v-html="playicon"></i>
            </div>
            <div class="min_linst" @click.stop="play_list">
                <i class="material-icons min_list_icon">&#xe03d;</i>
            </div>
        </div>
        <player-list ref="playlist" @select="selectItem"></player-list>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import getLyric from '@/api/lyric'
import { ERR_OK } from '@/api/config'
import {Base64 } from 'js-base64'
import Lyric from 'lyric-parser'
import PlayerList from '@/components/playerlist/playerlist'

  export default {
  data() {
    return {
        audio : {},
        currentTime: 0,
        progressw: 0,
        currentLyric: null,
        lyrictext: '',
        volumes: true
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
      volume() {
        return this.volumes  ? '&#xe050' : '&#xe04f'
      },
      playList() {
        return this.playList
      },
      ...mapGetters([
        "playList",
        'currentSong',
        'playstatus',
        'ListIndex',
        'PlayMuted',
        'fullScreen'
      ])
    },
    methods: {
      back () {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen( true )
      },
      play_list() {
        this.$refs.playlist.show()
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
        this.setPlaystatusState( ! this.playstatus )
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      playnext() {
        let next = null;
        if( this.ListIndex === this.playList.length - 1) {
          next = 0
        } else {
          next = this.ListIndex + 1
        }
        this.playtgger( next)
      },
      PlayMuteds() {
        if( this.volumes ) {
          this.audio.volume = 0
          this.volumes = false
        } else {
          this.audio.volume = this.PlayMuted
          this.volumes = true
        }
      },
      playprev() {
        let next = null;
        if( this.ListIndex === this.playList.length) {
          next = 0
        } else {
          next = this.ListIndex - 1
        }
        this.playtgger( next )
      },
      playtgger( e) {
        this.setCurrentIndex( e)
        if( !this.playstatus) {
          this.playstatus( true )
        }
        if( this.playstatus) {
          if (this.currentLyric) {
            this.currentLyric.togglePlay()
          }
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
      selectItem( k ) {
        this.playtgger( k )
      },
      scrollLyric( {lineNum, txt} ) {
        this.lyrictext = txt
      },
      ...mapMutations({
        setPlaystatusState: 'SET_PLAYSTATUS',
        setCurrentIndex: 'SET_LISTINDEX',
        setFullScreen: 'SET_FULLSCREEN'
      }),
      async _play( ) {
        for (let i = 0; i < 3; i++) {
          let p = this.audio.play()
          if( p !== undefined) {
            await p.then( () => {
              this._getLyric()
              this.audio.addEventListener('ended', this.playnext)
              i = 3
            }).catch( (error) => {
              if(i >= 2) {
                this.playnext()
              }
            })
          }

        }
      }
    },
    watch:{
      currentSong( n, o) {
        console.log( this.currentSong)
        let curl = null
        this.audio.src = ''
        if( this.playstatus ) {
          curl = this.currentSong.url
          this.audio = new Audio( curl );
          this.audio.volume = this.PlayMuted
          this._play()
        }
      },
      playstatus ( n ) {
        n ? this._play() : this.audio.pause()
        setInterval(() => {
          this.currentTime = this.audio.currentTime
          this.progressw =  (this.currentTime / this.currentSong.interval) * 100
        }, 1000)
      }
    },
    components: {
        PlayerList
    }
  }
</script>

<style scoped>
    .fullScreen {
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
        z-index: 100;
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
        text-align: left;
    }
    .title h1 {
        margin: 0;
        font-size: 15px;
        color: #00b7f8;
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
        opacity: calc( .07 );
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
        overflow: hidden;
    }
    .cd {
        position: relative;
        margin: 0 auto;
        width: 21rem;
        height: 21rem;
        box-sizing: border-box;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 6px 5px 10px 0 #00000024;
    }
    .cd.play>img{
        animation: rotate 20s linear infinite;
    }
    .cd.pause>img {
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
        height: 40px;
        margin: 30px auto 0 auto;
        text-align: center;
        overflow: hidden;
    }
    .lyric {
        line-height: 20px;
        font-size: 14px;
        color: #31c27c;
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
        width: 8px;
        height: 8px;
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
    .minplay {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
        background: #fff;
        box-shadow: 0 0 0.23rem 0 #00000026;
    }
    .min_cd_wrap {
        width: 60px;
    }
    .min_cd_wrap>img {
        width: 100%;
    }
    .min_info {
        margin-left: 10px;
        width: calc(100% - 150px);
        height: 60px;
        text-align: left;
    }
    .min_info_title {
        margin: 5px 0;
        padding: 0;
    }
    .min_info_title:after {
        content: '';
        clear: both;
        overflow: hidden;
        display: block;
    }
    .min_title {
        float: left;
        max-width: 62%;
        overflow: hidden;
    }
    .min_progress {
        float: right;
    }
    .min_info_title>.min_title>h1 {
        margin: 0;
        padding: 0;
        font-size: 15px;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .min_info_title>.min_title>span, .min_progress {
        font-size: 80%;
        opacity: .6;
        color: #333;
    }
    .min_info>.play_progress {
        margin: 0 auto 0;
    }
    .min_operators {
        width: 30px;
        height: 60px;
        text-align: center;
        margin-left: 15px
    }
    .min_operators>i.play_volume {
        font-size: 30px;
        line-height: 60px;
        color: #00b7f8;
    }
    .min_linst {
        margin-left: 5px;
    }
    .min_list {
        width: 30px;
        height: 60px;
        text-align: center;
    }
    .min_list_icon {
        font-size: 25px;
        line-height: 60px;
    }

    @-webkit-keyframes rotate{
        0%{-webkit-transform:rotate(0deg);}
        100%{-webkit-transform:rotate(360deg);}
    }
</style>
