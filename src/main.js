// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VForm,
  VSlider,
  VTextField,
  VCard,
  VSubheader,
  VSelect,
  VDataTable,
  VSnackbar,
  VAlert,
  VExpansionPanel
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VForm,
    VSlider,
    VTextField,
    VCard,
    VSubheader,
    VSelect,
    VDataTable,
    VSnackbar,
    VAlert,
    VExpansionPanel
  }// },
  // theme: {
  //   primary: '#ee44aa',
  //   secondary: '#424242',
  //   accent: '#82B1FF',
  //   error: '#FF5252',
  //   info: '#2196F3',
  //   success: '#4CAF50',
  //   warning: '#FFC107'
  // }
})
Vue.use(VueI18n)

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  }
}

const i18n = new VueI18n({
  numberFormats
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  i18n
})
