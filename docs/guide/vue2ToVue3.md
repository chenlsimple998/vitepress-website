将 Vue 2 项目迁移到 Vue 3 可以带来更好的性能、组合式 API 等新特性。以下是一个详细的迁移步骤：

### 1. 环境准备
在迁移之前，需要确保你的开发环境支持 Vue 3。建议使用 Node.js 版本 14 或更高版本。同时，安装 Vue CLI 4.5 或更高版本，因为它支持创建 Vue 3 项目。
```bash
# 全局安装或更新 Vue CLI
npm install -g @vue/cli
```

### 2. 升级依赖
#### 2.1 升级 Vue 核心库
在项目根目录下，将 `package.json` 中的 `vue` 版本更新为 `^3.0.0`，并更新相关的 Vue 插件，如 `vue-router` 和 `vuex` 到支持 Vue 3 的版本。
```bash
# 安装 Vue 3
npm install vue@^3.0.0
# 安装支持 Vue 3 的 vue-router
npm install vue-router@4
# 安装支持 Vue 3 的 vuex
npm install vuex@4
```

#### 2.2 检查其他依赖
确保项目中使用的其他第三方库也支持 Vue 3。有些库可能需要更新到最新版本，或者寻找替代方案。

### 3. 迁移组件
#### 3.1 选项式 API 到组合式 API
Vue 3 引入了组合式 API，你可以逐步将选项式 API 转换为组合式 API。例如，将 `data`、`methods`、`computed` 等选项转换为 `setup` 函数。
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
// Vue 2 选项式 API
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};

// Vue 3 组合式 API
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };

    return {
      count,
      increment
    };
  }
};
</script>
```

#### 3.2 生命周期钩子迁移
Vue 3 的生命周期钩子与 Vue 2 有所不同。需要将 Vue 2 的生命周期钩子替换为 Vue 3 对应的钩子。
| Vue 2 钩子 | Vue 3 钩子 |
| --- | --- |
| `beforeCreate` | `setup()` 开始时 |
| `created` | `setup()` 中 |
| `beforeMount` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeDestroy` | `onBeforeUnmount` |
| `destroyed` | `onUnmounted` |
| `errorCaptured` | `onErrorCaptured` |

### 4. 迁移路由
如果项目使用了 `vue-router`，需要将其升级到 4.x 版本，并进行相应的调整。
#### 4.1 创建路由实例
```javascript
// Vue 2
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

const router = new VueRouter({
  routes
});

export default router;

// Vue 3
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

#### 4.2 在应用中使用路由
```javascript
// Vue 2
import Vue from 'vue';
import App from './App.vue';
import router from './router';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

// Vue 3
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

### 5. 迁移状态管理
如果项目使用了 `vuex`，需要将其升级到 4.x 版本，并进行相应的调整。
#### 5.1 创建 store 实例
```javascript
// Vue 2
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

export default store;

// Vue 3
import { createStore } from 'vuex';

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

export default store;
```

#### 5.2 在应用中使用 store
```javascript
// Vue 2
import Vue from 'vue';
import App from './App.vue';
import store from './store';

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

// Vue 3
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const app = createApp(App);
app.use(store);
app.mount('#app');
```

### 6. 迁移模板语法
#### 6.1 `v-model` 语法调整
在 Vue 3 中，`v-model` 语法更加灵活。对于自定义组件，需要使用 `modelValue` 和 `update:modelValue` 来实现双向绑定。
```vue
<template>
  <!-- Vue 2 -->
  <CustomInput v-model="message" />

  <!-- Vue 3 -->
  <CustomInput :modelValue="message" @update:modelValue="message = $event" />
</template>

<script>
import CustomInput from './CustomInput.vue';

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      message: ''
    };
  }
};
</script>
```

#### 6.2 `v-bind` 和 `v-on` 合并
在 Vue 3 中，`v-bind` 和 `v-on` 可以合并为一个 `v-bind` 指令。
```vue
<template>
  <!-- Vue 2 -->
  <button v-bind:disabled="isDisabled" v-on:click="handleClick">Click me</button>

  <!-- Vue 3 -->
  <button :disabled="isDisabled" @click="handleClick">Click me</button>
</template>
```

### 7. details
https://v3-migration.vuejs.org/zh/