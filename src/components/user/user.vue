<template>
  <transition
    enter-active-class="animated fadelnLeft"
    leave-active-class="animated slideOutLeft"
    :duration="{enter:1000,leave:300}"
  >
    <div class="user_midel"
         v-show="users"
         @click="hide"
    >
      <div class="bg" v-if="users"></div>
        <div @click.stop class="user_box">
          <div class="user_herder">
            <span :class="falg ? 'active' : '' " @click="taggerh">收藏歌曲</span>
            <span :class="falg ? '' : 'active' " @click="taggerh">播放历史</span>
          </div>
          <div class="list-wrapper" ref="listWrapper" v-if="users">
              <scroll ref="plhs" class="conetent" :data="List">
                <div>
                  <div
                    v-for="(v, k) in List"
                    class="user_list_li"
                    @click="selectSong( v )"
                    v-if="List.length > 0"
                    ref="listItem"
                  >
                    <div class="user_bd">
                      <h3 class="user_tit" v-html="v.name"></h3>
                      <p class="user_list_txt" v-html="`${v.singer} - ${v.albumname}`"></p>
                    </div>
                    <div class="usericons">
                      <i class="material-icons pldedel" @click.stop="playerlistdeldel( key )">&#xe5cd;</i>
                    </div>
                  </div>
                  <div v-else>
                    暂无歌曲
                  </div>
               </div>
              </scroll>
          </div>
        </div>
    </div>
  </transition>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import Scroll from '@/layouts/scroll/scroll'
    export default {
    data() {
      return {
        falg: false,
        List: []
      }
    },
      mounted() {
        this.List = this.PlayListHistory
      },
      computed: {
        ...mapGetters( [
          'users',
          'PlayListHistory'
        ])
      }

      ,methods: {
        taggerh() {
          this.falg = !this.falg
          if( this.falg ) {
            this.List = []
          } else {
            this.List = this.PlayListHistory
          }
        },
        hide() {
          this.setUsers( false )
        },
        selectSong( v ) {
          this.AddPlay( v )
        },
        ...mapMutations( {
          setUsers : 'SET_USERS'
        }),
        ...mapActions ([
          'AddPlay'
        ])
      },
      components: {
        Scroll,
      }
    }
</script>

<style scoped>
  @import "animate.css";
  .user_midel, .user_box, .bg {
    position: fixed;
    top: 0;
    left: 0;
  }
  .user_midel {
    width: 100%;
    height: 100%;
    z-index: 181;
  }
  .user_box {
    width: 204px;
    height: 100vh;
    background: #fff;
    box-shadow: -6px 0 1.3rem 0 #00000026;
    z-index: 182;
  }
  .bg {
    right: 0;
    bottom: 0;
    background: #00000003;
    z-index: 179;
  }
  .user_herder {
    display: flex;
    padding:0 5px;
    height: 40px;
    line-height: 40px;
  }
  .user_herder>span {
    width: 50%;
    border-bottom: 1px solid #f0f1f2;

  }
  .user_herder span.active {
    border-bottom: 1px solid #ff8e99;
  }
  .user_list_li {
    width: 222px;
    margin: 5px 10px;
    text-align: left;
    border-bottom: 1px solid #f0f1f2;
  }
  .user_bd {
    margin-top: 10px;
    max-width: 180px;
    display: inline-block;
  }
  .user_tit {
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .user_list_txt {
    width: 80%;
    margin: 0;
    font-size: 12px;
    line-height: 32px;
    text-align: left;
    color: #00000080;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list-wrapper {
    position: absolute;
    width: 100%;
    top: 41px;
    bottom: 0;
  }
  .list-wrapper>div {
    height: 100%;
    overflow: hidden;
  }
  .usericons {
    float: right;
    width: 30px;
    height: 60px;
    line-height: 60px;
  }
  .pldedel {
    font-size: 13px;
  }
</style>
