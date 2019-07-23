<template>
  <div class="navbar">
    <div class="header">
      <el-row type="flex" class="row-bg" justify="space-between">
       <el-col :span="6">
          <h4> <img :src="bg" alt="">
               <span>广西大气环境遥感监测平台 </span></h4>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>

        <el-col :span="4">
          <div class="item">
            <i class="el-icon-location-outline"></i>
          南宁市
          </div>
          <div class="item">欢迎管理员！</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import img from '../../assets/img/logo.png';
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
    data(){
    return{
       bg:require('../../assets/img/logo.png')
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  .header {
    height: 50px;
    width: 100%;
    position: fixed;
    background: rgba(0, 6, 59, 0.8);
    box-shadow: 1px 1px 1px rgba(0, 6, 59, 0.8);
    z-index: 3000;
    h4 {
      background: rgb(19, 111, 205);
      margin: 0;
      color: #fff;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      opacity: 1 !important;
      width: 250px;
         img{
        width:30px;
        float: left;
        line-height: 50px;
    
        height:30px;
        margin:10px 5px;
         
      }
       span {
         float: left;
         height: 50px;
         line-height: 50px;
       }
    }
  }
  .item {
    display: inline-block;
    line-height: 50px;
    margin: 0 10px;
    color: #fff;
    font-size: 13px;
  }
}
</style>
