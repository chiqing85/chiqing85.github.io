<template>
    <div class="rank">
        <router-view/>
        <div v-show="!this.$route.params.id">
            <div class="disclist">
                <h1 class="list-title">排行榜</h1>
            </div>
            <div class="rank_bok">
                <div class="rank_main" v-for="v in topList" @click="selectItem( v )">
                    <div class="topic">
                        <img :src="v.picUrl" :alt="v.topTitle">
                    </div>
                    <div class="rank_info">
                        <p v-for="(list, k) in v.songList">
                            {{ k + 1}}
                            <span class="text_name">{{ list.songname }} </span>
                            / {{ list.singername }}
                        </p>
                    </div>
                </div>
                <div class="cfix" v-if="!this.$store.state.fullScreen"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getRank } from '@/api/rank'
    import { ERR_OK } from '@/api/config'
    import { mapMutations } from 'vuex'
  export default {
     data() {
       return {
         topList: []
       }
     },
    created() {
      this._getRank()
    },
    methods: {
      _getRank () {
        getRank().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
          }
        })
      },
      selectItem( data ) {
        this.$router.push( {
          path: `/rank/${data.id}`
        })
        this.setTopList( data )
      },
      ...mapMutations({
        setTopList : 'SET_TOPLIST'
      })
    }
  }
</script>

<style scoped>
    .disclist {
        height: 50px;
        margin-left: 10px;
    }
    .list-title {
        float: left;
        padding-left: 5px;
        font-size: 14px;
        font-weight: bold;
        border-left: 3px solid #68dae8;
    }
    .rank_main {
        margin-top: 3px;
    }
    .topic {
        float: left;
        width: 100px;
        height: 100px;
    }
    .topic>img {
        width: 100%;
    }
    .rank_info {
        margin-left: 100px;
        height: 100px;
        border-bottom: 1px solid #f0f1f2;
    }
    .rank_info>p {
        margin: 0;
        padding: 0;
        margin-left: 10px;
        font-size: 14px;
        line-height: 32px;
        text-align: left;
        color: #00000080;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    span.text_name {
        color: #000;
        margin-left: 8px;
        margin-right: 5px;
    }
</style>
