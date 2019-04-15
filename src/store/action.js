import * as  types from './global'
import { s_history, DelSearch, splisth } from '@/common/js/cache'

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

export let deleteSong = function ( {commit, state}, k) {
  let pl = state.playList,
      index = state.ListIndex
      pl.splice( k, 1)
      if( index > k ) {
        index --
      }
    commit( types.SET_PLAYSTATUS, pl)
    commit( types.SET_LISTINDEX, index)
    commit( types.SET_PLAYSTATUS, true)
}

export let playListhistory = function ( { commit }, v) {
  commit(types.SET_PLAYLIST_HISTORY, splisth( v ))
}

export let AddPlay = function ( {commit, state}, v ) {
  let pl = state.playList,
      index = state.ListIndex
      index ++
  let fin = findIndex( pl, v)
  pl.splice(index, 0, v )
  if( fin > -1) {
    if( index > fin) {
      pl.splice(fin, 1)
      index --
    } else {
      pl.splice( fin, 1)
    }
  }
  commit( types.SET_PLAYLIST, pl)
  commit( types.SET_LISTINDEX, index)
  commit( types.SET_PLAYSTATUS, true)
}

function findIndex( l, v) {
  return l.findIndex( (i) => {
    return i.mid === v.mid
  })

}
