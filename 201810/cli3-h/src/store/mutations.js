const mutations = {
  ['SET_AUDIOELE'](state, data) {
    state.audioEle = data
  },
  ['SET_PLAYLIST'](state, data) {
    state.playList = data
  },
  ['SET_STATUS'](state, data) {
    state.status = data
  },
  ['SET_PLAYINDEX'](state, data) {
    state.playIndex = data
  }
}
export default mutations