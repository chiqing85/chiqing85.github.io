<template>
    <div class="toplist">
        <div class="header">
            <img :src="picUrl" class="headerbg">
            <div class="headerfixed">
                <div class="back" @click="back">
                    <i class="material-icons">&#xe5cb;</i>
                </div>
                <h1 v-html="title" class="title"></h1>
            </div>
            <div class="listenCount">
                <div class="pull-left">
                    <i class="coon material-icons">&#xe310;</i>
                    <span> {{ listenCount|line }}</span>
                </div>
                <div class="pull-right">
                    <div class="ranklist_play" @click="ranklistpull">
                        <i class="material-icons blue">&#xe039;</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="rank_list">
            <div v-for="(v, k) in ranklist" class="rank_list_li" @click="selectItem( k )">
                <div class="rank_list_order"> {{ k + 1 }}</div>
                <div class="rank_bd">
                    <h3 class="rank_tit" v-html="v.name"></h3>
                    <p class="rank_list_txt" v-html="v.singer"></p>
                </div>
            </div>
            <div class="cfix" v-if="!this.$store.state.fullScreen"></div>
        </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { gettoplist } from '@/api/rank'
  import {ERR_OK} from '@/api/config'
  import {getCdlist} from '@/common/js/song'
  export default {
    data() {
      return {
        ranklist: []
      }
    },
    created() {
      this.__gettoplist()
      this._getTopList()
    },
    methods: {
      back () {
        this.$router.back()
      },
      __gettoplist() {
        if( !this.toplist.id ) {
          this.$router.push('/rank')
          return
        }
      },
      _getTopList() {
        gettoplist ( this.toplist.id )
          .then( (res) => {
            if( res.code === ERR_OK ) {
              this.ranklist = this._normalizeSongs( res['detail']['data']['songInfoList'] )
            }
          })
      },
      _normalizeSongs( list ) {
        let ret = []
        list.forEach( (v) => {
          if( v.id && v.mid ) {
            v['albumname'] = v.album.name
            v['songname'] = v.name
            v['songmid'] = v.mid
            v['songid'] = v.mid
            v['albummid'] = v.album.mid
            ret.push( getCdlist( v ) )
          }
        })
        return ret;
      },
      selectItem( k ) {
        this.selectPlay({
          list: this.ranklist,
          k
        })
      },
      ranklistpull( ) {
        this.playList({
          list: this.ranklist
        })
      },
      ...mapActions([
        'selectPlay',
        'playList'
      ])
    },
    computed: {
      title() {
        return this.toplist.topTitle
      },
      picUrl() {
        return this.toplist.picUrl
      },
      listenCount() {
        return this.toplist.listenCount
      },
      ...mapGetters([
        'toplist'
      ])
    },
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
  }
</script>

<style scoped>
    .toplist {
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
        max-height: 270px;
    }
    .rank_list_li {
        margin: 5px 10px;
        text-align: left;
        border-bottom: 1px solid #f0f1f2;
    }
    .rank_list_order {
        float: left;
        display: inline-block;
        width: 45px;
        margin-right: -16px;
        text-align: center;
        line-height: 37px;
    }
    .rank_list_li:nth-child( -n+3 ) .rank_list_order {
        font-size: 18px;
        font-style: oblique;
        color: #ff8e99;
    }
    .rank_bd {
        margin: 10px 0 0 50px;
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
</style>
