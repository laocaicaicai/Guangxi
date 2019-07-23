import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  path: '/',
  menuArr: [
    {
      name: '首页', expend: false, path: '/3dMap/index', id: 1, fkParentId: null,
      isTop: true,

      icon: 'el-icon-s-home',
      children: [

      ]
    },
    {
      name: '地图展示', expend: false, path: '/home', id: 2, fkParentId: null,
      icon: 'el-icon-eleme',
      children: [


      ]

    },
    {
      name: '专题产品', expend: false, path: '', id: 3, fkParentId: null,
      icon: 'el-icon-s-grid',
      children: [
        {
          name: 'PM2.5产品图', expend: false, path: '/topicProduct/pmTwo', children: [],
          id: 31, fkParentId: 3,

          children: []
        },
        {
          name: 'PM10产品图', expend: false, path: '/topicProduct/pmTen', children: [],
          id: 32, fkParentId: 3,

          children: []
        },
        {
          name: '气溶胶图', expend: false, path: '/topicProduct/aodOptics', children: [],
          id: 33, fkParentId: 3,

          children: []
        },
        

        {
          name: '卫星云图', expend: false, path: '/topicProduct/satellite', children: [],
          id: 34, fkParentId: 3,

          children: []
        },
        {
          name: '臭氧产品图', expend: false, path: '/topicProduct/ozone', children: [],
          id: 50, fkParentId: 3,

          children: []
        },
        {
          name: '火点产品', expend: false, path: '/topicProduct/firePoint', children: [],
          id: 35, fkParentId: 3,

          children: []
        },
        {
          name: '扬尘裸地', expend: false, path: '/topicProduct/bareLand', children: [],
          id: 36, fkParentId: 3,

          children: []
        },
        {
          name: '热点网格', expend: false, path: '/topicProduct/HotspotNetwork', children: [],
          id: 37, fkParentId: 3,

          children: []
        }
      ],


    },
    {
      name: '统计分析', expend: false, path: '', id: 4, fkParentId: null,
      icon: 'el-icon-s-data',
      children: [

        {
          name: 'PM2.5', expend: false, path: '/statisticalanalysis/pmTwo', id: 41, fkParentId: 4,
          children: [
    
          ]
        },
        {
          name: 'PM10', expend: false, path: '/statisticalanalysis/pmTen', id: 42, fkParentId: 4,
          children: [
    
          ]
        },
        {      
          name: '气溶胶产品', expend: false, path: '/statisticalanalysis/aod', id: 49, fkParentId: 4,
          children: [
    
          ]
        },
        {      
          name: '臭氧产品', expend: false, path: '/statisticalanalysis/ozone', id: 43, fkParentId: 4,
          children: [
    
          ]
        },
        {
          name: '火点产品', expend: false, path: '/statisticalanalysis/FireProducts', id: 44, fkParentId: 4,
          children: [
    
          ]
        },
        {
          name: '扬尘裸地', expend: false, path: '/statisticalanalysis/Bareland', id: 45, fkParentId: 4,
          children: [
    
          ]
        },
        {
          name: '热点网格', expend: false, path: '/statisticalanalysis/hotspotGrid', id: 46, fkParentId: 4,
          children: [
    
          ]
        }
      ],

    },
    {
      name: '报告展示', expend: false, path: '/reportShow/report', id: 5, fkParentId: null,
      icon: 'el-icon-document',
      children: [],

    }
  ]
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

