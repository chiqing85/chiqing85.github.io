<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :listennum="listennum" :creator="creator" :dissid="dissid">
        </music-list>
    </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MusicList from '@/components/music-list/MusicList'
export default {
  computed: {
    title () {
      return this.disc.dissname
    },
    bgImage () {
      return this.disc.imgurl
    },
    listennum () {
      return this.disc.listennum
    },
    creator () {
      return this.disc.creator
    },
    dissid () {
      return this.disc.dissid
    },
    ...mapGetters([
      'disc'
    ])
  },
  components: {
    MusicList
  }
}
</script>

<style scoped>

</style>
