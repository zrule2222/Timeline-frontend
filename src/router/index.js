import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminPage from '../views/AdminPage.vue'
import TimelinePage from '../views/TimelinePage.vue'
import RecordInformationModal from '../components/RecordInformationModal.vue'
import Page404 from '../views/404page.vue'
import LoginPage from '../views/LoginPage.vue'
import axios from 'axios';




Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: "Home",
      component: TimelinePage,
      meta: { requiresAuth: false },
      children: [
        {
          path: "/record/:id",
          name: "RecordInfo",
          components: {
            page: TimelinePage,
            rule: RecordInformationModal
          },
          meta: {
            showIfnoModal: true
          },
          beforeEnter: async (to, from, next) => {

            try {
              const response = await axios.get(`http://127.0.0.1:5022/api/Record/${to.params.id}`)
              if (response.data.is_visible == true) {
                next()
              }
              else {
                next('/404')
              }
            }
            catch (error) {
              next('/404')
            }
          }
        },
      ]

    },

    {
      path: '/admin',
      name: "Admin",
      component: AdminPage,
      meta: { requiresAuth: true }

    },
    {
      path: '/login',
      name: "Login",
      component: LoginPage,
      props: true,
      meta: { requiresAuth: false }
    },
    {
      path: '*',
      name: "InvalidLink",
      component: Page404
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            // selector: { x: 0, y: 0 },
            // behavior: 'smooth'
          })
        }, 40)
      })
    }
    return { x: 0, y: 0 };  // Go to the top of the page if no hash
  },
})
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
      });
    }
    else {
      next();
    }
    try {
      await axios.get(`http://127.0.0.1:5022/api/auth/status`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }

      })
      next()
    }
    catch (error) {
      next({
        path: "/",
      });
    }
  }
  else {
    next();
  }

});




export default router
