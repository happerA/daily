<template>
  <div class="top-view">
    <p class="head">云音乐排行榜</p>
    <div class="top-list_content">
      <router-link class="top-list_item"
        v-for="(music, index) in tMusics"
        :key="index"
        tag="div"
        :title="music.name+music.updateFrequency">
        <img class="top-item_img" :src="`${music.coverImgUrl}?param=200y200`" alt="cover">
        <h3 class="top-item_name">{{music.name}}</h3>
      </router-link>
    </div>
    <p class="head">推荐歌单</p>
    <div class="top-list_content">
      <router-link class="top-list_item"
        v-for="(list, index) in tLists"
        :key="index"
        tag="div"
        :to={}
        :title="list.name+list.updateFrequency">
        <img class="top-item_img" :src="`${list.picUrl}?param=200y200`" alt="cover">
        <h3 class="top-item_name">{{list.name}}</h3>
      </router-lin>
    </div>
  </div>
</template>
<script>
import * as api from '@/apis/index'
export default {
  name: 'top',
  data() {
    return {
      tMusics: [],
      tLists: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const _getToplistDetail = api.topListDetail().then((res) => {
        if (res.data.code === 200) {
          let list;
          list = res.data.list.filter(item => {
            if (item.ToplistType) {
              return item
            }
          });
          return list
        }
      });
      const _getPersonalized = api.getPersonalized().then(res => {
        if (res.data.code === 200) {
          return res.data.result
        }
      });
      Promise.all([_getToplistDetail, _getPersonalized])
        .then(([list, hotList]) => {
            this.tMusics = list;
            this.tLists = hotList.slice();
        })
    }
  }
}
</script>
<style lang="scss">
  .top-view {
    overflow: auto;
    .head {
      height: 34px;
      line-height: 34px;
      font-size: 18px;
      color: #fff;
    }
    .top-list_content {
      display: flex;
      flex-wrap: wrap;
    }
    .top-list_item {
      margin: 10px 1.5%;
      width: 22%;
      & .top-item_name {
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
</style>

