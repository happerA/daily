<template>
  <div class="music-progress" ref="progress">
    <div class="progress-container">
      <div class="progress-bar">
        <span class="dot" ref="dot"></span>
      </div>
      <span class="progress-out"></span>
      <span class="progress-inner"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-progress',
  props: {
    percent: { type: Number }
  },
  methods: {
    move(width) {
      this.$refs.dot.style.left = width + 'px'
    }
  },
  watch: {
    percent(val) {
      if (val >= 0) {
        const barWidth = this.$refs.progress.clientWidth;
        const offsetWidth = val * barWidth;
        this.move(offsetWidth)
      }
    }
  }
}
</script>
<style lang="scss">
  .music-progress {
    flex: 1;
    padding: 0 20px;
    .progress-container {
      width: 100%;
      height: 50px;
      & > .progress-bar {
        height: 2px;
        border-radius: 2px;
        width: 100%;
        background: hsla(0,0%,100%,.15);
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        .dot {
          position: absolute;
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: #fff;
          border-radius: 50%;
          left: -5px;
          top: -4px;
        }
      }
    }

  }
</style>

