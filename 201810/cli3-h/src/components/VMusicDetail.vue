<template>
  <div class="music-detail">
    <div class="song-info">
      <img class="song-img" :src="songBg" alt="play-cover">
    </div>
    <div class="lyric-container">
      <div class="lyric-view" :style="lyricTop">
        <p class="lyric-msg" v-show="!song">还没有播放音乐哦！</p>
        <p class="lyric-msg" v-show="nolyric">无歌词</p>
        <p :class="{on: lyricIndex==index}"
          v-for="(item, index) in lyric" :key="index">
          {{item.text}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'music-detail',
  computed: {
    ...mapGetters(['song', 'nolyric', 'lyric', 'lyricIndex']),
    songBg() {
      return this.song ? `${this.song.image}?param=200y200` : (require('../assets/player_cover.png'))
    },
    lyricTop() {
      return `transform: translateY(((-34 * ${this.lyricIndex})px)`
    }
  }
}
</script>
<style lang="scss">
  .music-detail {
    position: absolute;
    top: 0;
    width: 320px;
    right: 0;
    .song-info {
      display: block;
      width: 186px;
      height: 186px;
      margin: 0 auto 15px;
      position: relative;
      & > .song-img {
        width: 100%;
        height: 100%;;
      }
      &::before {
        content: '';
        position: absolute;
        left: 9px;
        top: 0;
        width: 201px;
        height: 180px;
        background: url("../assets/album_cover_player.png") 0 0 no-repeat;
      }
    }
  }
</style>

