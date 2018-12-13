import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from , next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles
          store.dispatch('GenerateRoutes', {roles}).then(rs => {
            router.addRoutes(store.getters.addRoutes)
            next({ ...to, replace: true })
          })
        }).catch(e => {
          store.dispatch('FedLogOut').then(res => {
            Message.error(err)
            next({path: '/'})
          })
        })
      } else{
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({path: '/403'})
        }
      }
    }
  } else {
    next('/login')
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})