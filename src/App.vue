<template>
  <div id="app">
    <m-header></m-header>
    <router-view/>
      <search></search>
      <player></player>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Player from '@/components/player/player'
import Search from '@/components/search/search'

export default {
  components: {
    MHeader,
    Player,
    Search
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
