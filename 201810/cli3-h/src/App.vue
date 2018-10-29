<template>
  <div id="app">
    <vheader/>
    <router-view/>
    <audio ref="myAudio"></audio>
  </div>
</template>
<script>
import vheader from './components/Vheader'
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    vheader
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
  }
</style>
