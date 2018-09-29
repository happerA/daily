(() => {
  document.addEventListener('touchstart', this.refreshTouchStart)
  document.addEventListener('touchmove', this.refreshTouchMove)
  document.addEventListener('touchend', this.refreshTouchEnd)

  refreshTouchStart = (e) => {
    let touch = e.changedTouches[0]
    this.tipText = '下拉刷新'
    this.startY = touch.clientY
  }

  refreshTouchMove = (e) => {
    this.$store.commit('bottomShowFalse')
    let touch = e.changedTouches[0]
    let _move = touch.clientY - this.startY
    this.bottomFlag = $('.present-box').offset().top + $('.present-box').height -document.body-clientHeight <= 40
    if ($('.present-box'.offset.top >= this.headerHeight)) {
      if(_move>0&&_move<1000) {
        this.el.style.marginTop = _move + 'px'
        this.moveDistance = touch.clientY - this.startY
        if (_move>50) {
          this.tipText = '松开即可刷新'
        }
      }
    }
  }

  refreshTouchEnd = () => {
    this.$store.commit('bottomShowTrue')
    if (this.bottomFlag) {
      this.$emit('loadBottom')
    }
    let that = this
    if (this.moveDistance > 50) {
      this.tipText = '加载中'
      let timer = setInterval(() => {
        that.el.style.marginTop = that.el.style.marginTop.split('px')[0] - 5 + 'px'
        if (Number(that.el.style.marginTop.split('px')[0])<=50) {
          clearInterval(timer)
          new Promise((resolve, reject) => {
            that.$emit('loadTop',resolve, reject)
          }).then(() => {
            this.resetBox()
          }).catch(() => {
            this.resetBox()
          })
        }
      }, 1)
    } else {
      this.resetBox()
    }
  }

  resetBox = () => {
    let that = this
    if (this.moveDistance > 0) {
      let timer = setInterval(() => {
        that.el.style.marginTop = that.el.style.marginTop.split('px')[0] -1 + 'px'
        if (Number(that.el.style.marginTop.split('px')[0])<=0) {
          clearInterval(timer)
        }
      }, 1)
    }
    this.moveDistance = 0
  }
})()