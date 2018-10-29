<template>
  <div :class="['music-control', playList.length==0 ? 'mask': '']">
    <div class="contorl-btns">
      <span class="contorl-btn prev"></span>
      <span :class="['contorl-btn', status ? 'play' : 'pause']" @click="play"></span>
      <span class="contorl-btn next"></span>
    </div>
    <v-progress :percent="percentMusic"></v-progress>
    <div class="more-btns">
      <span class="more-btn mode"></span>
      <span class="more-btn message"></span>
      <div class="more-btn volume">
        <span class="volume-btn"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import VProgress from './VProgress'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'v-music-control',
    components: { VProgress },
    data() {
      return {
        currentTime: 0
      }
    },
    computed: {
      ...mapGetters(['playList', 'status', 'audioEle', 'playIndex']),
      percentMusic() {
        const duration = this.audioEle ? this.audioEle.duration : null
        duration && console.log(this.currentTime / duration)
        return this.currentTime && duration ? this.currentTime / duration : 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initMusic()
      })
    },
    methods: {
      ...mapActions(['setStatus']),
      play() {
        this.setStatus(!this.status)
      },
      initMusic() {
        let ele= this.audioEle
        ele.ontimeupdate = () => {
          this.currentTime = ele.currentTime
        };
        //当前音乐播放完毕
        ele.onended = () => {
          this.next()
        };
      },
      prev () {
        let num = this.playIndex > 0 ? this.setPlayIndex(this.playIndex-1) : this.setPlayIndex(this.playList.length-1)
        this.setStatus(true)
      },
      next () {
        let num = this.playIndex < this.playList.length-1 ? this.setPlayIndex(this.playIndex+1) : this.setPlayIndex(0)
        this.setStatus(true)
      },
    },

  }
</script>
<style lang="scss">
  .music-control {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #fafafa;
    display: flex;
    &.mask {
      opacity: .6;
    }
    .contorl-btns {
      width: 150px;
      display: flex;
      justify-content: space-around;
      height: 100%;
      align-items: center;
    }
    .contorl-btn {
      display: inline-block;
      background-image: url('../assets/player.png');
      width: 19px;
      height: 19px;

      &.prev {
        background-position: 0px -30px;
      }
      &.pause {
        width: 21px;
        height: 29px;
        background-position: 0px 0px;
      }
      &.play {
        width: 21px;
        height: 29px;
        background-position: -30px 0;
      }
      &.next {
        background-position: 0px -52px;
      }
    }
    .more-btns {
      width: 250px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > .more-btn {
        display: inline-block;
        width: 24px;
        height: 24px;
        &.mode {
          width: 26px;
          height: 25px;
          background-image: url('../assets/player.png');
          background-position: 0 -205px;
        }
        &.message {
          background-image: url('../assets/player.png');
          background-position: 0 -400px;
        }
        &.volume {
          width: 150px;
          & > .volume-btn {
            display: inline-block;
            width: 26px;
            height: 21px;
            background-image: url('../assets/player.png');
            background-position: 0 -144px;
          }
        }
      }
    }
  }
</style>

