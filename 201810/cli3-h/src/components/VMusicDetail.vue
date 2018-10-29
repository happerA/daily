<template>
  <div class="music-detail">
    <div class="song-info">
      <img class="song-img" :src="songBg" alt="play-cover">
    </div>
  </div>
</template>
<script>
export default {
  name: 'music-detail',
  data() {
    return {
      songBg: require('../assets/player_cover.png')
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

