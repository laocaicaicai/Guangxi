<template>
  <div :class="classObj" class="app-wrapper">
    <navbar />
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar :menuList="menuList" />
     
    <div class="main-container">
    
      <div :class="{'fixed-header':fixedHeader}"></div>
         <el-scrollbar wrap-class="scrollbar-wrapper">
      <app-main />
          </el-scrollbar >
 
    </div>
     <div class="bottom">
          <div>
            版权所有© |京ICP备08011069|北京航天宏图信息技术股份有限公司
          </div>
            <div>
              <span>联系我们</span>
              <span>客户投诉</span>
              <span>网站地图</span>
              <span>法律公告</span>
                        
          </div>
      </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  data() {
    return {
      menuList: [
        // {
        //   path: "/func31",
        //   title: "首页"
        // },
        {
          path: "/dashboard",
          title: "首页",
          icon: "el-icon-s-home",
          children: [
            {
              path: "/func31",
              title: "首页"
            },
            {
              path: "/func31",
              title: "首页"
            }
          ]
        },
        {
          path: "/example/table",
          title: "地图展示",
          icon: "el-icon-eleme",
          children: []
        },
        {
          path: "/func32",
          title: "专题产品",
          icon: "el-icon-s-operation",
          children: []
        },
        {
          path: "/func32",
          title: "统计分析",
          icon: "el-icon-s-data",
          children: []
        },
        {
          path: "/func32",
          title: "报告展示",
          icon: "el-icon-document",
          children: []
        }
      ]
    };
  },
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .el-scrollbar__wrap {
     background: rgb(233,236,242);
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.bottom{
  height: 3vh;
  line-height: 3vh;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #1c222d ;
  z-index: 99999;
  color: #555759 ;
  display: flex;
  justify-content: space-evenly;
  font-size: 10px;
  span{
    margin: 0 13px
  }
}
</style>
