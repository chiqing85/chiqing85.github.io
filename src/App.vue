<template>
  <div id="app">
    <m-header></m-header>
      <keep-alive>
          <router-view/>
      </keep-alive>
      <search></search>
      <player></player>
      <user></user>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Player from '@/components/player/player'
import Search from '@/components/search/search'
import User from '@/components/user/user'

export default {
  components: {
    MHeader,
    Player,
    Search,
    User
  }
}
</script>

<style>
html,body {
    height: 100%;
    width: 100%;
}
#app {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
}
.cfix {
    height: 60px;
}
</style>
