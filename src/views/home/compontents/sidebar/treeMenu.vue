<template>
  <li>
    <!-- :class=" cur==data.path?'curBG':''" -->
    <span @click="toggle( data)" :class="path==data.path?'curBG':''">
      <i :class="data.icon"></i>
      {{ data.name }}
      <em
        v-if="hasChild"
        :class="data.expend==true? 'el-icon-arrow-down':'el-icon-arrow-up'"
      ></em>
    </span>
    
    <transition name="slide">
      <ul v-show="data.expend" v-if="hasChild">
        <tree-item v-for="(item, index) in data.children" :data="item" :key="index"></tree-item>
      </ul>
    </transition>
  </li>
</template>
 
<script>
export default {
  name: "TreeItem",
  computed: {},
  props: {
    data: {
      type: [Object, Array],
      required: true
    },
    cur: {
      type: String
    }
  },
  data() {
    return {
      open: false,
      list: {}
    };
  },
  computed: {
    hasChild() {
      return this.data.children && this.data.children.length;
    },
    path() {
      // return this.$store.getters.path
      return this.$store.state.user.path;
    }
  },
  watch: {
    path() {
      // this.toggle(this.list, 2)
    }
  },
  methods: {
    toggle(data) {
      console.log(data);
      // data.isExpend = !data.isExpend
      if (this.hasChild) {
        this.open = !this.open;
        data.expend = !data.expend;
      }

      if (data.children && data.children.length) {
      } else {
        this.$store.state.user.path = data.path;
        this.$router.push({ path: data.path });
      }
    }
  }
};
</script>
 
<style  style lang="scss" scoped>
.curBG {
  font-weight: bold;
  color: #fff;
  border-left: 2px solid blue;
}

</style>
