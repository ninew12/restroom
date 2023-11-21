import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// import Vue3SimpleHtml2pdf from "vue3-simple-html2pdf";

// import '@trevoreyre/autocomplete-vue/dist/style.css'

// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import materialKit from "./material-kit";
import  VueSelect  from "vue-select";
import Notifications from '@kyvg/vue3-notification'
import JsonExcel from "vue-json-excel3";

const app = createApp(App);
app.component("v-select", VueSelect)
app.component("downloadExcel",JsonExcel)
app.use(createPinia());
app.use(router);
app.use(materialKit)
app.use(Notifications)

app.mount("#app");
