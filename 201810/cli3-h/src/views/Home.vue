<template>
  <div class="wrapper home">
    <v-nav></v-nav>
    <v-music-list :songlist="songlist"/>
    <v-music-detail></v-music-detail>
    <v-music-control></v-music-control>
  </div>
</template>

<script>
// @ is an alias to /src
import VNav from '@/components/VNav.vue'
import VMusicList from '@/components/VMusicList.vue'
import VMusicDetail from '@/components/VMusicDetail.vue'
import VMusicControl from '@/components/VMusicControl.vue'
import * as api from '@/apis/index'
import { formatSongs } from '@/model/song'

export default {
  name: 'home',
  components: {
    VNav, VMusicList, VMusicDetail, VMusicControl
  },
  data() {
    return {
      songlist: []
    }
  },
  mounted() {
    api.search('光年之外').then(res => {
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
</script>
<style lang="scss">
  .wrapper {
    width: 968px;
    margin: 0 auto;
    height: calc(100% - 60px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    padding-bottom: 60px;
    &.home {
      padding-right: 320px;
    }
  }


</style>

