import { GetSearch } from '@/common/js/cache'
let state = {
  singer: {},
  disc: {},
  toplist: {},
  singerinfo: {},
  playList: [],
  ListIndex: -1,
  playstatus: false,
  PlayMuted: 0.3,
  fullScreen: false,
  search: false,
  searchHistory: GetSearch()
}
export default state
