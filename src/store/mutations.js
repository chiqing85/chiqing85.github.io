import * as types from './global'
import {SET_SEARCHHISTORY} from './global'
const matutaions = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },

  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },

  [types.SET_TOPLIST] (state, list) {
    state.toplist = list
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },

  [types.SET_LISTINDEX] (state, index) {
    state.ListIndex = index
  },

  [types.SET_PLAYSTATUS] (state, flag) {
    state.playstatus = flag
  },

  [types.SET_PLAYMUTED] (state, index) {
    state.PlayMuted = index
  },

  [types.SET_FULLSCREEN] (state, flag) {
    state.fullScreen = flag
  },

  [types.SET_SEARCH] (state, flag) {
    state.search = flag
  },

  [types.SET_SEARCHHISTORY] (state, history) {
    state.searchHistory = history
  }
}
export default matutaions



