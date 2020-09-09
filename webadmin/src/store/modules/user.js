import { login, logout, findById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { sessionStorageSet, sessionStorageRemove, sessionStorageGet } from '@/utils/storage'
import md5 from 'js-md5'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    id: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
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
  // async login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   try {
  //     const res = await login({ username: username.trim(), password: password })
  //     const { data } = res
  //     console.log('3333' + JSON.stringify(data))
  //     commit('SET_TOKEN', data.token)
  //     setToken(data.token)
  //   } catch (error) {
  //     return null
  //   }
  // },
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const pararms = {
      account: username.trim(),
      password: md5(password)
    }
    return new Promise((resolve, reject) => {
      login(pararms).then(response => {
        const { data } = response.data
        commit('SET_TOKEN', data.token)
        sessionStorageSet('userData', data)
        sessionStorageSet('deptId', data.deptId)
        sessionStorageSet('town', data.town)
        sessionStorageSet('deptName', data.deptName)
        sessionStorageSet('status', data.status)
        setToken(data.token)
        sessionStorageSet('id', data.id)
        sessionStorageSet('router', data.router)
        sessionStorageSet('account', data.account)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      findById(sessionStorageGet('deptId')).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
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
        sessionStorageRemove('userData')
        sessionStorageRemove('deptId')
        sessionStorageRemove('account')
        sessionStorageRemove('id')
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

