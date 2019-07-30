

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
  <div class="side-nav" style="z-index:2000;opacity: 1 !important;">
    <ul v-for="(item,index) in arr" :key="index">
      <c-tree-item :data="item"></c-tree-item>
    </ul>
  </div>
  </el-scrollbar>
</template>

<script>
import cTreeItem from "./treeMenu";
export default {
  data() {
    return {
      menuArr: []
    };
  },

  props: ["layout"],
  computed: {
    str() {
      return this.$store.state.user.path;
    },
    arr() {
      return this.$store.state.user.menuArr;
    }
  },
  watch: {
    $route(to, from) {
      this.matchUrl();
    }
  },
  mounted() {
    this.matchUrl();
  },
  methods: {
    // 路径匹配
    matchUrl() {
      var result = this.flatten(this.arr);
      // console.log(result)
      var id = this.findSelf(this.$route.path, result);
      // console.log(id)
      var familyArr = this.familyTree(result, id);
      // console.log(familyArr)
      this.toTree(familyArr);
      console.log(this.toTree(familyArr));
      this.$store.state.user.menuArr = this.toTree(familyArr);
      this.highLight(this.$route.path);
    },
    // 1.做url输入对应点亮左侧菜单栏
    highLight(path) {
      this.$store.state.user.path = path;
    },
    //2.做URl 输入展开对应的菜单如果有父级展开父级 否则什么也不做
    flatten(menus1) {
      let menuArr = [];
      function spread(menus) {
        for (var i = 0; i < menus.length; i++) {
          var menu = menus[i];
          if (menu.children) {
            spread(menu.children);
          }

          menuArr.push(menu);
        }
      }
      spread(menus1);

      return menuArr;
      //return arr
    },
    //  找出自己对应路径path的id
    findSelf(path, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (path == arr[i].path) {
          return arr[i].id;
        }
      }
    },
    //3.找出所有父级以及自己本身id改变isExpend 属性为true
    familyTree(arr, pid) {
      var temp = [];
      var forFn = function(arr, pid) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (item.id == pid) {
            temp.push(item.id);
            forFn(arr, item.fkParentId);
          }
        }
      };
      forFn(arr, pid);

      for (let k = 0; k < arr.length; k++) {
        // arr[k].isExpend = false
        for (let m = 0; m < temp.length; m++) {
          if (arr[k].id == temp[m]) {
            // console.log(arr[k])
            arr[k].expend = true;
          }
        }
      }
      return arr;
    },
    //4.组装树形菜单
    // 3.平级数据进行树形结构组装
    toTree(data) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function(item) {
        delete item.children;
      });

      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      data.forEach(function(item) {
        map[item.id] = item;
      });
      //        console.log(map);

      var val = [];
      data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.fkParentId];

        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item);
        }
      });
      return val;
    }
  },
  components: {
    cTreeItem
  }
};
</script>
<style style lang="scss" scoped>
.side-nav {
   padding-bottom:100px;
  ul {
  list-style: none;
  text-align: left;
  margin: 0;
  /* margin-left: 5px; */
  padding-left: 0;
  border-top: 0;
}
li {
  color: rgb(166, 172, 192);
 
}
li:last-of-type {
 
}
li > span {
  cursor: pointer;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  display: block;
  padding-left: 20px;
  position: relative;
}
li > span:visited {
}
em {
  /* float: right;
  height: 50px;
  display: block;
  line-height: 50px; */
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}
} 
</style>

