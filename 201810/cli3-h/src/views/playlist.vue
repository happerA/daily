<template>
  <v-music-list :songlist="songlist"/>
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
      detailObj: {}
    }
  },
  mounted() {
    api.playListDetail(this.$route.params.id).then(res => {
      if (res.data.code == 200) {
        if (!res.data.result.tracks) {
          console.log('no song')
          return
        }
        this.songlist = [...this.songlist, ...formatSongs(res.data.result.tracks)]
        // this.detailObj = {
        //   img: res.data.result.coverImgUrl,
        //   name: res.data.result.name,
        //   updateTime: res.data.result.trackUpdateTime,
        //   trackCount: res.data.result.trackCount,
        //   shareCount: res.data.result.shareCount
        // }
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

