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
  users: false,
  searchHistory: GetSearch( 'SearchHistory'),
  PlayListHistory: GetSearch( 'PlHistory')
}
export default state
