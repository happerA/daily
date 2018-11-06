<template>
  <div class="music-progress" >
    <div class="progress-container" ref="progress">
      <div class="progress-bar">
        <span class="dot" ref="dot"
          @mousedown="mousedown"/>
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
  mounted() {
    this.init()
  },
  data() {
    return {
      isFlag: false,
      X: 0,
      offleft: 0,
      moveX: 0,
      max: 0
    }
  },
  methods: {
    init() {
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
      this.max = this.$refs.progress.offsetWidth - this.$refs.dot.offsetWidth

    },
    move(width) {
      this.$refs.dot.style.left = width + 'px'
    },
    mousedown(e){
      this.isFlag = true;
      this.X = e.clientX; //获取当前元素相对于窗口的X左边
      this.offleft = this.$refs.dot.offsetLeft; //当前元素相对于父元素的左边距
    },
    mousemove (e){
      if (this.isFlag == false){
        return;
      }

      let changeX = e.clientX
      this.moveX = Math.min(this.max, Math.max(0, this.offleft+(changeX - this.X)))
      this.$refs.dot.style.left = Math.max(0, this.moveX) +"px";
    },
    mouseup() {
      if (this.isFlag) {
        this.isFlag = false
        this.$emit('progress', this.moveX/this.max)
      }
    }
  },
  watch: {
    percent(val) {
      if (val >= 0) {
        const barWidth = this.$refs.progress.clientWidth;
        const offsetWidth = val * barWidth;
        this.move(offsetWidth - 5)
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

