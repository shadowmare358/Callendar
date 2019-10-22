import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyBkgpG3lxJDkwC6SUJ0DYKlJuF_imQKgpk",
    authDomain: "vue-calendar-26214.firebaseapp.com",
    databaseURL: "https://vue-calendar-26214.firebaseio.com",
    projectId: "vue-calendar-26214",
    storageBucket: "vue-calendar-26214.appspot.com",
    messagingSenderId: "692993978095",
    appId: "1:692993978095:web:d31fb8ceb38097a0b6751a"
});
export const db = firebase.firestore();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
