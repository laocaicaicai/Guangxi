<template>
  <section class="app-main">
    <div class="toggleSidbar">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
    </div>

    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
    ...mapGetters(["sidebar", "avatar"])
  },
  components: {
    Hamburger
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height:100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  position: relative;
  padding-top: 50px;
  background: rgb(233,236,242);

}

.hamburger-container {
  padding: 0 !important;
  cursor: pointer;
  z-index: 3000;
}
.toggleSidbar {
  position: fixed;
  top: 50%;
  height: 60px;
  width: 20px;
  background: #0b0b3b;
  margin-left: -1.5px;
  text-align: center;
  line-height: 60px;
  border-radius: 6px;
  color: #fff;
  z-index: 200000;
}
.toggleSidbar i {
  color: #fff !important;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
