import { createApp } from 'vue';
import { store, STORE_KEY } from './store';
import App from './App.vue';

const app = createApp(App);
app.use(store, STORE_KEY);
app.mount('#app');
