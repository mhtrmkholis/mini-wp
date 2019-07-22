import Vue from 'vue';
import App from './App.vue';
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {
    hideModules: { "table": true, "image": true },
    image: {
      uploadURL: "/api/myEndpoint",
      dropzoneOptions: {}
    },
    maxHeight: "500px",
    forcePlainTextOnPaste: false
});
new Vue(App).$mount('#app');