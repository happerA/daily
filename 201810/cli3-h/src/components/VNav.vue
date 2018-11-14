<template>
  <div class="nav-tools">
    <router-link v-for="(nav, index) in navs" :key="index"
      :to="nav.link"
      :class="{'act': acIndex == index}"
      tag="span">
      {{nav.name}}
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'VNav',
  data() {
    return {
      navs: [
        {link: '/playlist', name: '正在播放'},
        {link: '/toplist', name: '推荐'},
        {link: '/search', name: '搜索'},
        {link: '/userlist', name: '我的歌单'},
        {link: '/hostory', name: '我听过的'},
      ]
    }
  },
  computed: {
    acIndex() {
      let router = this.$route.path
      return this.navs.findIndex(nav => `/${nav.link}` === router)
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-tools {
    margin-bottom: 20px;
    & > span {
      text-align: center;
      border: 1px solid #c9c9c9;
      border-radius: 2px;
      font-size: 14px;
      height: 38px;
      line-height: 38px;
      display: inline-block;
      box-sizing: border-box;
      color: #fff;
      background-color: transparent;
      min-width: 122px;
      margin-right: 6px;
      cursor: pointer;
      opacity: .8;
      transition: all .2s linear;
      &:hover {
        opacity: 1;
        border-color: #fff;
      }
      &.act {
        opacity: 1;
        border-color: #fff;
      }
    }
  }
</style>
