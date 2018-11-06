<template>
  <div :class="['music-control', playList.length==0 ? 'mask': '']">
    <div class="contorl-btns">
      <span class="contorl-btn prev"></span>
      <span :class="['contorl-btn', status ? 'play' : 'pause']" @click="play"></span>
      <span class="contorl-btn next"></span>
    </div>
    <v-progress :percent="percentMusic"
      @progress="musicProgress"/>
    <div class="more-btns">
      <span :class="['more-btn', 'mode', mode == 'cirle' ? '': (mode == 'random' ?'mode-random': 'mode-loop')]"
        @click="changeMode"/>
      <span class="more-btn message"/>
      <div class="more-btn volume">
        <span class="volume-btn"></span>
        <v-progress :percent="volume"></v-progress>
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
        currentTime: 0,
        volume: 1,
        modes: ['circle', 'random', 'loop']
      }
    },
    computed: {
      ...mapGetters(['playList', 'status', 'audioEle', 'playIndex', 'mode']),
      percentMusic() {
        const duration = this.audioEle ? this.audioEle.duration : null
        return this.currentTime && duration ? this.currentTime / duration : 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initMusic()
      })
    },
    methods: {
      ...mapActions(['setStatus', 'setPlayIndex', 'setMode']),
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
          this.mode == 'loop' ? this.loop() : this.next()
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
      loop() {
        this.audioEle.currentTime = 0
        this.audioEle.play()
      },
      musicProgress(data) {
        this.audioEle.currentTime = this.audioEle.duration * data
      },
      volumeProgress(data) {
        this.volume = data
        this.audioEle.volume = data
      },
      changeMode() {
        this.setMode(this.modes[this.modes.findIndex(item => this.mode==item)+1])
      }
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
          cursor: pointer;
          background-image: url('../assets/player.png');
          background-position: 0 -205px;
          &.mode-random {
            width: 25px;
            height: 19px;
            background-position: 0 -74px;
          }
          &.mode-loop {
            width: 26px;
            height: 25px;
            background-position: 0 -232px;
          }
        }

        &.message {
          background-image: url('../assets/player.png');
          background-position: 0 -400px;
        }
        &.volume {
          width: 150px;
          height: 100%;
          display: flex;
          align-items: center;
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

