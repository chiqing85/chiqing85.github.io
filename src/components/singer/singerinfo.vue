<template>
    <div class="sinfo">
        <div class="header">
            <img :src="picUrl" class="headerbg">
            <div class="zcao">
                <div class="headerfixed">
                    <div class="back" @click="back">
                        <i class="material-icons">&#xe5cb;</i>
                    </div>
                    <h1 v-html="title" class="title"></h1>
                </div>
                <div class="listenCount">
                    <div class="pull-left">
<!--                        <i class="coon material-icons">&#xe310;</i>-->
                        单曲
                        <span> {{ singlelist.total }}</span>
                    </div>
                    <div class="pull-right">
                        <div class="ranklist_play" @click="listpull">
                            <i class="material-icons blue">&#xe039;</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rank_list">
            <div v-for="(v, k) in singlelist.list" class="rank_list_li" @click="selectItem( k )">
                <div class="rank_bd">
                    <h3 class="rank_tit" v-html="v.name"></h3>
                    <p class="rank_list_txt" v-html="`${v.singer} - ${v.albumname}`"></p>
                </div>
            </div>
            <div class="cfix" v-if="!this.$store.state.fullScreen"></div>
        </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import {getCdlist} from '@/common/js/song'

  export default {
    data() {
      return {
        singlelist: []
      }
    },
    created () {
      this.__getsingerinfo()
      this._getSingerDetail()
    },
    methods: {
      __getsingerinfo() {
        if( !this.singerinfo.singermid) {
          this.$router.push('/singer')
          return
        }
      },
      back () {
        this.$router.back()
      },
      _getSingerDetail() {
        getSingerDetail(this.singerinfo.singermid)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.singlelist = this._normalizeSongs(res['data'])
            }
          })
      },
      _normalizeSongs( d ) {
        let ret = []
        d.list.forEach( (item ) => {
          if (item.musicData.songid && item.musicData.songmid)
            ret.push( getCdlist( item.musicData))
        })
        d['list'] = ret
        return d
      },
      listpull() {
        this.playList( {
          list: this.singlelist.list
        })
      },
      selectItem( k ) {

        this.selectPlay({
          list: this.singlelist.list,
          k
        })
      },
      ...mapActions([
        'playList',
        'selectPlay'
      ])
    },
    computed: {
      picUrl() {
        return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singerinfo.singermid}.jpg`
      },

      title() {
        return this.singerinfo.singername
      },
      ...mapGetters([
        'singerinfo'
      ])
    }
  }
</script>

<style scoped>
    .sinfo {
        position: absolute;
        top: 0;
        width: 100%;
        min-height: 100%;
        background: #fff;
    }
    .header {
        position: relative;
        max-height: 250px;
        overflow: hidden;
        color: #fff;
    }
    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        padding: .3rem .4125rem .325rem .475rem;
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
    .headerbg {
        width: 100%;
    }
    .listenCount {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 10px;
        width: 93%;
    }
    .listenCount span {
        display: inline-block;
        height: 30px;
        line-height: 1.85;
        float: right;
        margin-left: 8px;
    }
    .rank_list_li {
        margin: 5px 10px;
        text-align: left;
        border-bottom: 1px solid #f0f1f2;
    }
    .rank_bd {
        margin: 10px 0 0 10px;
        display: block;
    }
    h3.rank_tit {
        margin: 0;
        padding: 0;
        font-size: 16px;
        color: #000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    p.rank_list_txt {
        width: 80%;
        margin: 0;
        font-size: 14px;
        line-height: 32px;
        text-align: left;
        color: #00000080;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .headerfixed {
        position: absolute;
        top: 0;
        left: 0;
        height: 35px;
        width: 100%;
    }
    .zcao {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: #00000014;
    }
</style>
