export const setAudioEle = ({commit, state}, data) => {
  commit('SET_AUDIOELE', data)
}
export const setPlayList = ({commit, state}, data) => {
  commit('SET_PLAYLIST', data)
}
export const setStatus = ({commit, state}, data) => {
  commit('SET_STATUS', data)
  data ? state.audioEle.play() : state.audioEle.pause()
}
export const setPlayIndex = ({commit, state}, data) => {
  commit('SET_PLAYINDEX', data)
  state.audioEle.src = state.playList[data].url
}