<template>
  <div class="wrapper home">
    <v-nav></v-nav>
    <div class="music_container">
      <div class="music_header">
        <span class="header_item">歌曲</span> 
        <span class="header_item">歌手</span> 
        <span class="header_item">专辑</span> 
      </div>
      <ul class="music_list">
        <li v-for="(song, index) in songlist" :key="index"
          class="music">
          
          <span class="music_name music_msg">
            <span class="music_num music_msg">{{index+1}}</span>
            {{song.name}}
            <span class="music_play">|></span>
          </span>
          <span class="music_name music_msg">{{song.singer}}</span>
          <span class="music_album music_msg">{{song.album}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VNav from '@/components/VNav.vue'
import * as api from '@/apis/index'
import { formatSongs } from '@/model/song'

export default {
  name: 'home',
  components: {
    VNav
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
        console.log(this.songlist)
      }
    })
  }
}
</script>
<style lang="scss">
  .wrapper {
    width: 968px;
    margin: 0 auto;
    height: calc(100% - 180px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .music_container {
    flex: 1;
    overflow: hidden;
    .music_list {
      height: calc(100% - 50px);
      overflow: auto;
    }
    .music_header, .music {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid hsla(0,0%,100%,.1);
      line-height: 50px;
      overflow: hidden;
      display: flex;
      box-sizing: border-box;
      & > .header_item {
        width: 150px;
        color: #fff;
        text-align: left;
        &:first-child {
          flex: 1;
          padding-left: 40px;
        }
      } 
      & > .music_msg {
        width: 150px;
        color: #fff;
        text-align: left;
        position: relative;
        & >.music_num {
          position: absolute;
          width: 40px;
          left: 0;
          text-align: center;
        }
        &:first-child {
          flex: 1;
          padding-left: 40px;
        }
        & > .music_play {
          position: absolute;
          right: 65px;
          opacity: 0;
        }
        &:hover > .music_play {
          opacity: 1;
        }
      }
    }
  }
  
</style>

