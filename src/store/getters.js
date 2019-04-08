export let singer = state => state.singer

export let disc = state => state.disc

export let playList = state => state.playList

export let ListIndex = state => state.ListIndex

export const currentSong = (state) => {
  return state.playList[state.ListIndex]|| {}
}
