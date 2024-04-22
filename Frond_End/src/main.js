import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "primevue/resources/themes/aura-light-green/theme.css";
import vue3GoogleLogin from "vue3-google-login";
import router from "./routers";
import store from "./store";
import MultiSelect from "primevue/multiselect";
import PrimeVue from "primevue/config";

const ClientID =
  "139725488057-r7ap1v6i90ef2fgfhvvch986tmllj9nl.apps.googleusercontent.com";

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId: ClientID,
});
app.use(router);
app.use(store);
app.use(PrimeVue);
app.component("MultiSelect", MultiSelect);
app.mount("#app");
