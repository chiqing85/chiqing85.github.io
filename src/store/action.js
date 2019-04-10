import * as  types from './global'
export let playList = function ({commit}, {list}) {
  commit( types.SET_PLAYLIST, list)
  commit( types.SET_LISTINDEX, 0)
  commit( types.SET_PLAYSTATUS, true)
}
