<template>
  <div class="top-view">
    <p class="head">云音乐排行榜</p>
    <div class="top-list_content">
      <div class="top-list_item"
        v-for="(music, index) in tMusics"
        :key="index">
      </div>
    </div>
    <p class="head">推荐歌单</p>
    <div class="top-list_content">
      <div class="top-list_item"
        v-for="(list, index) in tLists"
        :key="index">
      </div>
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

