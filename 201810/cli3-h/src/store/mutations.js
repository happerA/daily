const mutations = {
  ['SET_AUDIOELE'](state, data) {
    state.audioEle = data
  },
  ['SET_PLAYLIST'](state, data) {
    state.playList = data
    state.playRandomList = data.sort(_ => Math.random() - 0.5)
  },
  ['SET_STATUS'](state, data) {
    state.status = data
  },
  ['SET_PLAYINDEX'](state, data) {
    state.playIndex = data
  },
  ['SET_SONG'](state, data) {
    state.song = data
  },
  ['SET_MODE'](state, data) {
    state.mode = data
  },
  ['SET_NOLYRIC'](state, data) {
    state.nolyric = data
  },
  ['SET_LYRIC'](state, data) {
    state.lyric = data
  },
  ['SET_LYRICINDEX'](state, data) {
    state.lyricIndex = data
  }
}
export default mutations