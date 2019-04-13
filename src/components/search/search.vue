<template>
  <div class="search" v-if="search"  @click="hidden_icons">
    <div class="s_header">
        <div class="form-group search_area">
            <i class="material-icons">&#xe8b6;</i>
            <input type="text" class="form-control" ref="input" :placeholder="iholder" v-model="iv">
            <span class="icon_delete" v-if="is" @click="idelete()"></span>
        </div>
        <div class="s_hidden" @click="hidden">取消</div>
    </div>
    <div class="s_history">
        <div class="s_popular" v-show="!is">
            <div class="s_title_bar">
                <h5 class="s_title">热门搜索</h5>
            </div>
            <div class="s_tags">
                <span class="tag_s" v-for="item in hotkey" v-text="item.k" @click="addquer( item.k)"></span>
            </div>
            <div class="s_title_bar" v-show="searchHistory.length > 0">
                <h5 class="s_title shdt">搜索历史</h5>
                <div class="shdic" @click="shdt()">
                    <i class="shdic material-icons">&#xe872;</i>
                    <span>清空</span>
                </div>
            </div>
            <div class="sarchhistory">
                <span class="tag_s" v-for="(h, k) in searchHistory" @touchstart.prevent="tochinsh" @touchend.prevent="cleartime( h )">
                    {{ h }}
                    <i class="sh_delete" @touchend.prevent="shdele( k )" v-if="tochrc"></i>
                </span>
            </div>
        </div>
        <div class="s_list" v-if="is">
            <ul class="search-list-ul">
                <li class="search-list-li" v-for="(v, k) in result" @click="selectItem(v, k)">
                        <span class="media" v-if="v.type =='singer' ">
                            <img :src="`https://y.gtimg.cn/music/photo_new/T001R68x68M000${v.singermid}.jpg?max_age=2592000`" alt="">
                        </span>
                    <i class="material-icons" v-else>&#xe405; </i>
                    <span class="main_tit" v-html="getDisplayName( v )"></span>
                    <p class="singer" v-html="getsinger( v )"></p>
                </li>
            </ul>
            <div class="cfix" v-if="!this.$store.state.fullScreen"></div>
        </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import {gethotkey, searchList} from '@/api/search'
    import { ERR_OK } from '@/api/config'
    import { Singer } from '@/common/js/song'
    import { getCdlist } from '@/common/js/song'
    const TYPE_SINGER = 'singer'
  export default {
   data() {
     return {
       iholder: '搜索歌曲、歌单、专辑',
       hotkey: [],
       iv: null,
       p: 1,
       result: [],
       is: false,
       tochrc: false
     }
   },
    mounted() {
       this._gethotkey()
    },
    computed: {
      ...mapGetters ([
       'search',
        'searchHistory'
     ]),
    },
    methods: {
      addquer (e) {
        this.iv = e
      },
      idelete () {
        this.iv = null
      },
      getDisplayName (v) {
        if (v.type == TYPE_SINGER) {
          return v.singername
        } else {
          return `${v.songname}`
        }
      },
      getsinger (v) {
        if (v.type == TYPE_SINGER) {
          return `<span>单曲: ${v.songnum}</span><span>专辑: ${v.albumnum}</span>`
        } else {
          return `${Singer(v.singer)}`
        }
      },
      hidden () {
        this.setsearch(false)
      },
      ...mapMutations({
        setsearch: 'SET_SEARCH'
      }),
      _gethotkey () {
        gethotkey().then((res) => {
          if (res.code == ERR_OK) {
            this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      _searchList () {
        searchList(this.iv, this.p)
          .then((res) => {
            if (res.code == ERR_OK) {
              this.result = this.getResult(res.data)
            }
          })
      },
      getResult (d) {
        let ret = []
        if (d.zhida && d.zhida.singerid) {
          ret.push({...d.zhida, ...{type: TYPE_SINGER}})
        }
        if (d.song) {
          ret = ret.concat(d.song.list)
        }
        return ret
      },
      _normalizeSongs (l) {
        let ret = []
        l.forEach((data) => {
          if (data.songid && data.albummid) {
            ret.push(getCdlist(data))
          }
        })
        return ret
      },
      selectItem (v, k) {
        if( v.type == TYPE_SINGER) {
          this.$router.push({
            path: `/singer/${v.singermid}`
          })
          this.hidden()
          this.setsingerinfo( v )
        } else {
            this.selectPlay({
              list: this._normalizeSongs(this.result),
              k
            })
        }
        this.cache()
      },
      tochinsh() {
        // 清空定时器
        clearInterval( this.loop )
        this.loop = setTimeout( () => {
          this.tochrc = true
          this.loop = 0
        }, 500 );
      },
      cleartime( h ) {
        clearInterval( this.loop)
        if( this.loop != 0 ) {
          this.addquer( h )
        }
      },
      shdele( k ) {
        clearInterval( this.loop)
        this.loop = 0
        this.shdt( k )
      },
      hidden_icons() {
        this.tochrc = false
      },
      cache() {
        if( this.iv) {
          this.saveSearchHistory( this.iv )
        }
      },
      shdt( k ) {
        this.delSearchHistory( k )
      },
      ...mapActions([
        'selectPlay',
        'saveSearchHistory',
        'delSearchHistory'
      ]),
      ...mapMutations ({
        setsingerinfo: 'SET_SINGER_INFO'
      })
    },
    watch: {
     search() {
       if( this.search) {
         this.$nextTick( () => {
           this.$refs.input.focus()
         })
       }
     },
      iv() {
       if( this.iv ) {
         this.is = true
         this._searchList()
       } else {
         this.is = false
       }
      }
    }
  }
</script>

<style scoped>
    ul,li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .search {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
    .s_header {
        position: relative;
        box-sizing: border-box;
        height: 4.7rem;
        padding-top: .6875rem;
        padding-bottom: .625rem;
        border-bottom: 1px solid #f0f1f2;
        background-color: #fff;
    }
    .search_area {
        position: absolute;
        top: 0;
        right: 3.75rem;
        bottom: 0;
        left: 1rem;
        height: 3rem;
        margin: auto;
        border-radius: .25rem;
        background-color: #f6f7f9;
    }
    .search_area>i {
        position: absolute;
        top: 0;
        bottom: 0;
        left: .5rem;
        margin: auto;
        color: #969ba3;
        width: 1em;
        height: 1em;
        vertical-align: -.25ex;
        fill: currentColor;
    }
    .form-control:focus {
        box-shadow: unset;
    }
    .search_area>input {
        text-indent: 2rem;
        background: 0;
        border: 0;
        box-shadow: unset;
    }
    .s_hidden {
        font-size: .875rem;
        line-height: 2rem;
        position: absolute;
        top: 0;
        right: .25rem;
        bottom: 0;
        width: 3.25rem;
        height: 2rem;
        margin: auto;
        text-align: center;
    }
    .s_title_bar {
        line-height: 1.52rem;
        overflow: hidden;
        padding: 0 1rem;
        text-align: left;
        background-color: rgba(0,0,0,.03);
    }
    .s_tags, .sarchhistory{
        padding: .25rem .5rem .75rem 1rem;
        text-align: left;
    }
    span.tag_s {
        position: relative;
        font-size: .8125rem;
        line-height: 1.6875rem;
        display: inline-block;
        padding: 0 .625rem;
        text-align: center;
        border: 1px solid;
        border-radius: 99px;
        margin: 1rem .5rem 0 0;
        color: #969ba3;
    }
    .search-list-ul {
        padding-left: 1rem;
    }
    .search-list-li {
        box-sizing: border-box;
        height: 3.5rem;
        text-align: left;
        border-bottom: 1px solid #f0f1f2;
    }
    .search-list-li>span.media {
        float: left;
        width: 3rem;
        height: 3rem;
        margin: .25rem 1rem .25rem 0;
        border-radius: 100%;
    }
    .media>img {
        display: block;
        width: 100%;
    }
    li.search-list-li>i {
        float: left;
        font-size: 20px;
        line-height: 3rem;
        width: 3rem;
        text-align: center;
        color: #0000004d;
    }
    p.singer {
        font-size: 12px;
        color: #0000004d;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0;
        margin: 0;
    }
    span.main_tit {
        margin-top: .25rem;
    }
    .s_list {
        display: block;
        height: calc(100vh - 4.7rem);
        overflow: scroll;
    }
    span.icon_delete, .sh_delete {
        position: absolute;
        top: 9px;
        right: 12px;
        width: 18px;
        height: 18px;
        background: #adabab61;
        border-radius: 100%;
    }
    span.icon_delete:before, span.icon_delete:after, .sh_delete:before, .sh_delete:after {
        content: "";
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 8px;
        background: #fff;
        -webkit-transform: rotate(45deg);
    }
    .icon_delete:before,.sh_delete:before {
        width: 10px;
        height: 2px;
        margin-left: -5px;
        margin-top: -1px;
    }
    span.icon_delete:after, .sh_delete:after {
        width: 2px;
        height: 10px;
        margin-left: -1px;
        margin-top: -5px;
    }
    .shdt {
        display: inline-block;
    }
    .shdic {
        float: right;
        font-size: 16px;
        margin-top: 5px;
    }
    .shdic>span {
        font-size: 12px;
        margin-right: 5px;
        line-height: 26px;
        color: #969ba3;
    }
    i.sh_delete {
        width: 15px;
        height: 15px;
        top: -7px;
        right: -5px;
        background: #ff8e99;
    }
</style>
