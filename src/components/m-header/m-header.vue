<template>
  <div id="header">
    <div id="openGuide" @click="ushow">
      <span class="Guide"></span>
    </div>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">歌榜</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
      </router-link>
    </div>
    <div id="search" class="icon" @click="clicksearch">
        <i class="material-icons">&#xe8b6;</i>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'search',
      'users'
    ]),
  },
  methods: {
    clicksearch() {
      this.setsearch( !this.search )
    },

    ushow() {
      this.setusers( !this.user )
    },
    ...mapMutations({
      setsearch: 'SET_SEARCH',
      setusers: 'SET_USERS'
    })
  }
}
</script>

<style scoped>
  .icon>svg, svg.icon {
    width: 18px;
    height: 18px;
    vertical-align: -.15ex;
    fill: currentColor;
    color: #666;
  }
  #header{
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666666;
  }
  #openGuide{
    position: relative;
    float: left;
    width: 50px;
    height: 40px;
  }
  span.Guide::before,span.Guide::after {
    position: absolute;
    left: 12px;
    top: 13px;
    width: 20px;
    content: '';
    border-top: 1.3px solid;
  }
  span.Guide::before{
    height: 7px;
    border-bottom: 1.3px solid;
  }
  span.Guide::after {
    -webkit-transform: translateY(13px);
    transform: translateY(13px);
  }
  .tab {
    width: 60%;
    height: 40px;
    display: inline-block;
    margin: 0 auto;
  }
  .tab-item {
    float: left;
    width: 33%;
    line-height: 40px;
  }
  #search{
    float: right;
    width: 50px;
    height: 40px;
  }
  #search>i {
      font-size: 25px;
     line-height: 40px;
  }
  .router-link-active {
    font-weight: bold;
    color: #2ddae8;
    border-bottom: 1px solid#2ddae8;
  }
</style>
