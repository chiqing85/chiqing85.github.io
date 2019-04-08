<template>
    <div class="player" v-show="playList.length > 0">
        <div class="back" @click="back">
            <svg class="icon icon-arrow-l">
                <title>返回</title>
                <use xlink:href="#icon-arrow-l">
                    <svg id="icon-arrow-l" viewBox="0 0 8 16" width="100%" height="100%">
                        <path d="M.146 7.646a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7v.708l7-7a.5.5 0 0 0-.708-.708l-7 7z"></path>
                    </svg>
                </use>
            </svg>
        </div>
        <h1 class="title" v-html="currentSong.songname"></h1>
        <img :src="currentSong.image" alt="">
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    mounted() {

    },
    computed: {
      playList() {
        return this.playList

      },
      ...mapGetters([
        // 'mapGetters'
        "playList",
        'currentSong'
      ]),
    },
    methods: {
      back () {
        this.$router.back()
      },
      prev() {

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
    }
    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        padding: .3rem .4125rem .325rem .475rem;
    }
    svg.icon {
        width: 1rem;
        height: 1rem;
        vertical-align: -.15ex;
        fill: currentColor;
    }
</style>
