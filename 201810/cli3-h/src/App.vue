<template>
  <div id="app">
    <vheader/>
    <div class="wrapper home">
      <v-nav></v-nav>
      <router-view></router-view>
      <v-music-detail></v-music-detail>
      <v-music-control></v-music-control>
    </div>
    <audio ref="myAudio"></audio>
    <div class="bg" :style="appBg"></div>
    <div class="bg-mask"></div>
  </div>
</template>
<script>
import vheader from './components/Vheader'
import VNav from '@/components/VNav.vue'
import VMusicDetail from '@/components/VMusicDetail.vue'
import VMusicControl from '@/components/VMusicControl.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    vheader, VNav, VMusicDetail, VMusicControl
  },
  computed: {
    ...mapGetters(['song']),
    appBg() {
      return this.song ? `background-image: url(${this.song.image}?param=300y300)` : `background-color: rgb(160, 192, 192)`
    }
  },
  created() {
    this.$nextTick(() => {
      this.SET_AUDIOELE(this.$refs.myAudio)
    });
  },
  methods: {
    ...mapMutations(['SET_AUDIOELE'])
  }
}
</script>

<style lang="scss">
  @import './css/reset.css';
  #app {
    height: 100%;
    width: 100%;
    position: relative;
    color: hsla(0,0%,100%,.6);
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
    .bg {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      position: absolute;
      z-index: -2;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      -webkit-filter: blur(12px);
      filter: blur(12px);
      opacity: .7;
      transform: translateZ(0);
      transition: all .8s;
    }
    .bg-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
      background-color: rgba(0,0,0,.4);
    }
  }
</style>
