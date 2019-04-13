import * as  types from './global'
import { s_history, DelSearch } from '@/common/js/cache'

export let playList = function ({commit}, {list}) {
  commit( types.SET_PLAYLIST, list)
  commit( types.SET_LISTINDEX, 0)
  commit( types.SET_PLAYSTATUS, true)
  commit( types.SET_FULLSCREEN, true)
}

export let selectPlay = function ({commit, state}, {list, k}) {
  commit(types.SET_PLAYLIST, list)
  commit( types.SET_LISTINDEX, k)
  commit( types.SET_PLAYSTATUS, true)
  commit( types.SET_FULLSCREEN, true)
}

export let saveSearchHistory = function ( {commit}, v) {
  commit(types.SET_SEARCHHISTORY, s_history( v ))
}

export let delSearchHistory = function ( { commit}, v) {
  commit(types.SET_SEARCHHISTORY, DelSearch( v ))
}
