import * as types from './global'
const matutaions = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },

  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },

  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },

  [types.SET_LISTINDEX] (state, index) {
    state.ListIndex = index
  },

  [types.SET_PLAYSTATUS] (state, flag) {
    state.playstatus = flag
  }
}
export default matutaions
