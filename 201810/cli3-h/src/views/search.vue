<template>
  <div class="search-view">
    <div class="search-tools">
      <span class="hot-search"
        v-for="(hot, index) in hots"
        :key="index"
        @click="selectHot(index)">{{hot.first}}</span>
        <input class="search-input"
          type="text"
          v-model="searchWord"
          placeholder="音乐/歌手"
          @keydown.enter="wordSearch"/>
    </div>
    <v-music-list :songlist="songlist" v-show="songlist.length"/>
  </div>
</template>

<script>
// @ is an alias to /src
import VMusicList from '@/components/VMusicList.vue'
import * as api from '@/apis/index'
import { formatSongs } from '@/model/song'

export default {
  name: 'home',
  components: {
    VMusicList
  },
  data() {
    return {
      songlist: [],
      hots: [],
      searchWord: ''
    }
  },
  mounted() {
    this.init()

  },
  methods: {
    init() {
      this.getHots()
    },
    getHots() {
      api.searchHot().then(res => {
        if (res.data.code == 200) {
          this.hots = [...res.data.result.hots].slice(0, 4)
        }
      })
    },
    selectHot(i) {
      this.songlist = []
      let kw = this.hots[i].first
      this.search(kw)
    },
    wordSearch() {
      this.songlist = []
      if (!this.searchWord) return
      this.search(this.searchWord)
    },
    search(word) {
      api.search(word).then(res => {
        if (res.data.code == 200) {
          if (!res.data.result.songs) {
            console.log('no song')
            return
          }
          this.songlist = [...this.songlist, ...formatSongs(res.data.result.songs)]
        }
      })
    }
  }
}
</script>
<style lang="scss">
.search-view {
  position: relative;
  padding-top: 50px;
  height: calc(100% - 58px);
  box-sizing: border-box;
  display: flex;
}
  .search-tools {
    position: absolute;
    top: 0;
    display: flex;
    height: 30px;
    padding: 10px 15px;
    overflow: hidden;
    background: rgba(0,0,0,.2);
    & span {
      line-height: 30px;
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    & input {
      display: flex;
      line-height: 30px;
      margin-right: 10px;
      font-size: 14px;
      color: #fff;
      background: transparent;
      box-sizing: border-box;
      border: 1px solid hsla(0,0%,100%,.6);
      outline: 0;
      box-shadow: inset 0 0 1px 0 #fff;
      padding: 0 10px;
      flex: 1;
    }
  }
</style>

