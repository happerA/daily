<template>
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
          <span class="music_num music_msg on" v-if="status && playIndex ==index"></span>
          <span class="music_num music_msg" v-else>{{index+1}}</span>
          {{song.name}}
          <span :class="['music_play', (status && playIndex ==index) ? 'pause' : '']" @click="play(index)"></span>
        </span>
        <span class="music_name music_msg">{{song.singer}}</span>
        <span class="music_album music_msg">{{song.album}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import * as api from '@/apis/index'

export default {
  name: 'v-music-list',
  props: {
    songlist: {type: Array, default: () => ([])}
  },
  computed: {
    ...mapGetters(['audioEle', 'playIndex', 'status', 'song', 'playList'])
  },
  methods: {
    ...mapActions(['setPlayList', 'setStatus', 'setPlayIndex', 'setSong']),
    play(index) {
      let id = this.songlist[index].id
      if (this.song && this.song.id === id && this.status) {
          this.setStatus(false);
          return
      }

      if (this.song && this.song.id === id && !this.status) {
          this.setStatus(true);
      } else {
        api.musicDetail(this.songlist[index].id).then(res => {
            if (res.data.songs[0].al.picUrl) {
              this.setSong({...this.songlist[index],image: res.data.songs[0].al.picUrl})
              if (!this.playList.length||this.playList.toString() != this.songlist.toString()) {
                this.setPlayList(this.songlist)
              }

              this.setPlayIndex(index);
              this.setStatus(true)
            }
          });
      }
    },
  }
}
</script>
<style lang="scss">
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
          &.on {
            display: block;
            height: 100%;
            font-size: 0;
            background: url("../assets/wave.gif") no-repeat center center;
          }
        }
        &:first-child {
          flex: 1;
          padding-left: 40px;
        }
        & > .music_play {
          position: absolute;
          right: 27px;
          top: 7px;
          opacity: 0;
          width: 36px;
          height: 36px;
          background: url('../assets/icon_list_menu.png') no-repeat;
          background-position: -80px 0;
        }
        &:hover > .music_play {
          opacity: .6;
        }
        &:hover > .music_play:hover {
          background-position: -120px 0;
          opacity: 1;
        }
        &:hover > .pause {
          background-position: -80px -200px;
          opacity: .6;
          }
        &:hover > .pause:hover {
            background-position: -120px -200px;
            opacity: 1;
        }
      }
    }
  }
</style>

