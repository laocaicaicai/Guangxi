<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-button type="text" disabled>
        <hamburger
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar"
        />
      </el-button>
      <el-menu
        router
        mode="vertical"
        background-color="#0B0B3B"
        text-color="#999"
        active-text-color="#fff"
        :default-active="defActive"
      >
        <sidebar-item v-for="menu in menuList" :key="menu.path" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import Hamburger from "@/components/Hamburger";
export default {
  name: "Sidebar",
  components: { SidebarItem, Hamburger },
  computed: {
    defActive() {
      return this.$route.path;
    },
    ...mapGetters(["sidebar", "avatar"])
  },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  }
};
</script>
// <style lang="scss">
// .sidebar-container {
//   transition: width 0.28s;
//   width: 180px !important;
//   height: 100%;
//   position: fixed;
//   font-size: 0px;
//   bottom: 0;
//   left: 0;
//   z-index: 1001;
//   overflow: hidden;
//   .showTag {
//     position: absolute;
//     top: 50%;
//     width: 20px;
//     height: 80px;
//     color: #000;
//     z-index: 2000;
//   }
//   .horizontal-collapse-transition {
//     transition: 0s width ease-in-out, 0s padding-left ease-in-out,
//       0s padding-right ease-in-out;
//   }
//   .el-scrollbar {
//     height: 100%;
//   }
//   .scrollbar-wrapper {
//     overflow-x: hidden !important;
//     .el-scrollbar__view {
//       height: 100%;
//     }
//   }
//   .el-scrollbar__bar.is-vertical {
//     right: 0px;
//   }
//   .is-horizontal {
//     display: none;
//   }
//   a {
//     display: inline-block;
//     width: 100%;
//     overflow: hidden;
//   }
//   .el-menu {
//     border: none;
//     height: 100%;
//     width: 100% !important;
//   }
//   .is-active > .el-submenu__title {
//     color: #f4f4f5 !important;
//   }
//   .el-menu-item.is-active {
//     border-left: 2px solid rgb(19, 11, 205);
//   }
// }
</style>