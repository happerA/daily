<template>
  <div id="app">
    <vheader/>
    <router-view/>
  </div>
</template>
<script>
import vheader from './components/Vheader'
export default {
  name: 'app',
  components: {
    vheader
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
