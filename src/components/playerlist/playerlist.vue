<template>
    <transition name="PlayerList">
        <div class="list-wrapper" v-show="showlist" @click="hide">
            <div class="bg"></div>
            <div class="list" @click.stop>
                <div class="listtop">
                    <div class="list-top-l">播放列表</div>
                    <div class="list-top-r"> 清空</div>
                </div>
                <div class="list-wraper">
                    <li v-for="(item, key) in playList" class="listitem" :class="key === ListIndex ? 'active' : ''" @click.stop="selectItem(key)">
                        <div class="text">
                            <h2 class="name">
                                <div> <i class="material-icons"> {{ key === ListIndex ? '&#xe050' : ''}}</i> {{ item.name}} - <span>{{ item.singer}}</span></div>
                            </h2>
                            <i class="material-icons pldedel" @click.stop="playerlistdeldel( key )">&#xe5cd;</i>
                        </div>

                    </li>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import {ListIndex} from '../../store/getters'
  export default {
    data() {
      return {
        showlist: false
      }
    },
    methods: {
      show() {
        this.showlist = true
      },
      hide() {
        this.showlist = false
      },
      selectItem(k) {
        this.$emit('select', k)
      },
      playerlistdeldel( k ) {
        this.deleteSong( k )
      },
      ...mapActions ( [
        'selectPlay',
        "deleteSong"
      ])
    },
    computed: {
      ...mapGetters([
        "playList",
        "ListIndex"
        ])
    },
  }
</script>

<style scoped>
 .PlayerList-enter-active, .PlayerList-leave-active {
     transition: opacity 0.3s
 }
 .PlayerList-leave-active .list-wrapper, .PlayerList-enter-active .list-wrapper {
     transition: all 0.3s
 }
  .PlayerList-enter, .PlayerList-leave-to {
      opacity: 0;
  }
    .PlayerList-enter .list-wrapper, .PlayerList-leave-to .list-wrapper {
        transform: translate3d(0, 100%, 0);
    }
  .bg {
         position: fixed;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         background: #00000080;
         z-index: 179;
     }
     .list {
         position: fixed;
         left: 0;
         right: 0;
         bottom: 0;
         z-index: 200;
         background: #fff;
     }
     .list-wraper {
         overflow-y: scroll;
         height: 300px;
     }
     .listtop {
         height: 44px;
         padding: 10px 0 0 10px;
         border-bottom: 1px solid #2ddae8;
     }
     .list-top-l {
         float: left;
         padding-left: 5px;
         border-left: 3px solid #68dae8;
     }
     .list-top-r {
         float: right;
         line-height: 1.1;
         padding-right: 10px;
     }
    li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
     li.listitem {
         padding: 5px 20px 0 15px;
         text-align: left;
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
         width: 90%;
         float: left;
         display: -webkit-box;
         margin: 0;
         font-size: 14px;
         -webkit-box-align: center;
         color: #000;
     }
     i.material-icons.pldedel {
         font-size: 13px;
         margin-left: 5px;
     }
     h2.name div{
         display: block;
         width: 100%;
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
     }
     .active .name div, .active i, .active .name span {
         color: #ff8e99;
     }
     .active i {
         font-size: 13px;
         margin-right: 10px;
     }
    .name span {
         font-size: 80%;
         opacity: .6;
         color: #333;
     }
</style>
