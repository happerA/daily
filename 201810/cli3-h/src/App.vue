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
  </div>
</template>
<script>
import vheader from './components/Vheader'
import VNav from '@/components/VNav.vue'
import VMusicDetail from '@/components/VMusicDetail.vue'
import VMusicControl from '@/components/VMusicControl.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    vheader, VNav, VMusicDetail, VMusicControl
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
    background-color: rgb(160, 192, 192);
    width: 100%;
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
  }
</style>
