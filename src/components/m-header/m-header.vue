<template>
  <div id="header">
    <div id="openGuide">
      <span class="Guide"></span>
    </div>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
      </router-link>
    </div>
    <div id="search" class="icon"><svg><use xlink:href="#icon-search">
      <svg id="icon-search" viewBox="0 0 17 18" width="100%" height="100%"><path d="M12.775 14.482l3.371 3.372a.5.5 0 0 0 .708-.708l-3.372-3.37-1.817-1.818a.5.5 0 1 0-.707.707l1.817 1.817zM1 7.14a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm13 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"></path></svg></use></svg>
    </div>
  </div>
</template>

<script>
export default { }
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
  .router-link-active {
    font-weight: bold;
    color: #2ddae8;
    border-bottom: 1px solid#2ddae8;
  }
</style>
