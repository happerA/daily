<template>
  <div class="music-detail">
    <div class="song-info">
      <img class="song-img" :src="songBg" alt="play-cover">
      <template v-if="song">
          <dd>歌曲名：{{song.name}}</dd>
          <dd>歌手名：{{song.singer}}</dd>
          <dd>专辑名：{{song.album}}</dd>
      </template>
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
      return this.lyricIndex > 4 ? `transform :translate3d(0, ${-34*(this.lyricIndex-3)}px, 0)`: ''
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
    bottom: 60px;
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
      & dd {
        height: 30px;
        line-height: 30px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .lyric-container {
    position: absolute;
    top: 300px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    .lyric-view {
      transform: translate3d(0,0,0);
      transition: transform .6s ease-in-out;
      & p {
        font-size: 14px;
        line-height: 34px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &.on {
          color: #40ce8f;
        }
      }
    }
  }
</style>

