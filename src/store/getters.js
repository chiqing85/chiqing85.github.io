export let singer = state => state.singer

export let disc = state => state.disc

export let playList = state => state.playList

export let ListIndex = state => state.ListIndex

export const currentSong = (state) => {
  return state.playList[state.ListIndex]|| {}
}

export let playstatus = state => state.playstatus

export let PlayMuted = state => state.PlayMuted

export let fullScreen = state => state.fullScreen

export let search = state => state.search

export let searchHistory = state => state.searchHistory

export let toplist = state => state.toplist

export let singerinfo = state => state.singerinfo
