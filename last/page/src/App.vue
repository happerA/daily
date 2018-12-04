<template>
  <div id="app">
    <ul class="mo-paging">
        <!-- prev -->
        <li
        :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]"
        @click="prev">prev</li>

        <!-- first -->
        <li
        :class="['paging-item', 'paging-item--first']"
        v-show="pagers[0]!=1"
        @click="first">1</li>

        <li
        :class="['paging-item', 'paging-item--more']"
        v-if="showPrevMore">...</li>

        <li
        :class="['paging-item',  index === pager ? 'paging-item--current' : '']"
        v-for="(pager, kindex) in pagers" :key="kindex"
        @click="go(pager)">{{ pager }}</li>

        <li
        :class="['paging-item', 'paging-item--more']"
        v-if="showNextMore">...</li>

        <!-- last -->
        <li
        :class="['paging-item', 'paging-item--last']" v-show="pagers[pagers.length-1]!=pages"
        @click="last">{{pages}}</li>

        <!-- next -->
        <li
        :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]"
        @click="next">next</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
        return {
            index : 5, //当前页码
            limit : 10, //每页显示条数
            pages : 20, //总记录数
            perPages: 5,
            showPrevMore : false,
            showNextMore : false,
        }
    },
  methods : {
        prev(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next(){
            if (this.index < this.pages) {
                this.go(this.index + 1)
            }
        },
        first(){
            if (this.index !== 1) {
                this.go(1)
            }
        },
        last(){
            if (this.index != this.pages) {
                this.go(this.pages)
            }
        },
        go (page) {
            if (this.index !== page) {
                this.index = page
                //父组件通过change方法来接受当前的页码
                this.$emit('change', this.index)
            }
        }
    },
    computed : {
        //计算页码，当count等变化时自动计算
        pagers() {
            const array = []
            const perPages = this.perPages
            const pageCount = this.pages
            let current = this.index
            const _offset = (perPages - 1) / 2


            const offset = {
                start : current - _offset,
                end   : current + _offset
            }

            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            if (offset.start < 1) offset.start = 1

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }

            return array
        }
    },
    watch: {
      pagers: {
        immediate: true,
        handler(v) {
          this.showPrevMore = v[0] > 1
          this.showNextMore = v[v.length-1] < this.pages
        }
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li {
  list-style: none;
  display: inline-block;
  width: 50px;
}
.paging-item--current {
  color: blue;
}
</style>
