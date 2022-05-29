import { createApp } from 'vue';
import { store, STORE_KEY } from './store/store';
import App from './App.vue';

const app = createApp(App);
app.use(store, STORE_KEY);

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
