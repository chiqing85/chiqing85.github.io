<template>
  <div class="singer">
      <router-view/>
      <div v-show="!this.$route.params.id">
          <div class="tag">
              <p class="tag_title pull-left">歌手分类</p>
              <p class="pull-right tag_show" @click="singer_tag_show">
                  <span v-text="tagsshow ? '关闭' : '展开'"></span>
                  <i class="material-icons" v-html="showicons"></i>
              </p>
          </div>
          <div class="singer_tag" v-show="tagsshow">
              <div class="area">
                  <span :class="a.id == area ? ' singer_tag_item active' : 'singer_tag_item'" v-for="a in Tags.area" v-html="a.name" @click="tagjs('area', a.id )"></span>
              </div>
              <div class="genre">
                  <span :class="g.id == genre ? ' singer_tag_item active' : 'singer_tag_item'" v-for="g in Tags.genre" v-html="g.name" @click="tagjs('genre', g.id )"></span>
              </div>
              <div class="sex">
                  <span :class="s.id == sex ? ' singer_tag_item active' : 'singer_tag_item'" v-for="s in Tags.sex" v-html="s.name" @click="tagjs('sex', s.id )"></span>
              </div>
          </div>
          <div class="singerlist">
              <div class="singerlist_box" v-for="v in SinerList" @click="selectItem(v)">
                  <div class="singer_list__cover">
                      <img :src="`https://y.gtimg.cn/music/photo_new/T001R68x68M000${v.singer_mid}.jpg?max_age=2592000`" alt="">
                  </div>
                  <div class="singerlist_text">
                      <p> {{ v.singer_name}}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import {getSingerList} from '@/api/singer'
  import {ERR_OK} from '@/api/config'
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        SinerList: [],
        Tags: [],
        tagsshow: false,
        area: -100,
        genre: -100,
        sex: -100
      }
    },
    created () {
      this._getSingerList( this.area, this.genre ,this.sex)
    },
    computed: {
      showicons() {
        return this.tagsshow ?  '&#xe316;' : '&#xe313;'
      }
    },
    methods: {
      _getSingerList( a, g, s) {
        getSingerList( a, g, s).then( (res) => {
          if( res.code == ERR_OK) {
            this.Tags = res.singerList.data.tags
            this.SinerList = res.singerList.data.singerlist
          }
        })
      },
      singer_tag_show() {
        this.tagsshow = !this.tagsshow
      },
      tagjs(n, v ) {
        this[n] = v
        this._getSingerList( this.area, this.genre ,this.sex)

      },
      selectItem( i ) {
        let ret = []
        ret['singerid'] = i.singer_id
        ret['singermid'] = i.singer_mid
        ret['singername'] = i.singer_name
        ret['singerpic'] = i.singer_pic
        this.$router.push( {
            path: `/singer/${i.singer_mid}`
        } )
        this.setsingerinfo( ret )
      },
      ...mapMutations ({
        setsingerinfo: 'SET_SINGER_INFO'
      })
    }
  }
</script>

<style scoped>
.tag {
    height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid #2ddae8;
}
p.tag_title {
    margin: 10px 0;
    padding-left: 5px;
    border-left: 3px solid #68dae8;
}
.tag_show {
    margin: 10px 0;
}
.tag_show i {
    font-size: 14px;
}
.singer_tag>div {
    padding: .25rem .5rem .75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #f0f1f2;
}
 .singer_tag_item {
     display: inline-block;
     margin: 1rem .5rem 0 0;
     padding: 0 .625rem;
     text-align: center;
     color: #969ba3;
 }
span.singer_tag_item.active {
    border-radius: 99px;
    color: #fff;
    background: #2ddced;
}
.singerlist {
    text-align: left;
}
.singerlist_box {
    padding: 10px 0;
    padding-left: 1rem;
    border-bottom: 1px solid #f0f1f2;
}
.singer_list__cover {
    float: left;
    width: 50px;
    height: 50px;
}
.singer_list__cover img {
    width: 100%;
    border-radius: 100%;
}
.singerlist_text {
    width: 200px;
    margin-left: 60px;
    height: 50px;
    line-height: 50px;
}
.singerlist_text p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>
