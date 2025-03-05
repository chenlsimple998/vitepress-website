1、搭建 monorepo 环境
npm install pnpm -g # 全局安装pnpm
pnpm init # 初始化package.json配置⽂件 私有库
pnpm install vue typescript -D # 全局下添加依赖

`shamefully-hoist = true  // 作用依赖包都扁平化的安装在node_modules下面 `创建tsconfig.json文件

```{

"compilerOptions": {
"module": "ESNext", // 打包模块类型ESNext
"declaration": false, // 默认不要声明⽂件
"noImplicitAny": false, // ⽀持类型不标注可以默认any
"removeComments": true, // 删除注释
"moduleResolution": "node", // 按照node模块来解析
"esModuleInterop": true, // ⽀持es6,commonjs模块
"jsx": "preserve", // jsx 不转
"noLib": false, // 不处理类库
"target": "es6", // 遵循es6版本
"sourceMap": true,
"lib": [
// 编译时⽤的库
"ESNext",
"DOM"
],
"allowSyntheticDefaultImports": true, // 允许没有导出的模块中导⼊
"experimentalDecorators": true, // 装饰器语法
"forceConsistentCasingInFileNames": true, // 强制区分⼤⼩写
"resolveJsonModule": true, // 解析json模块
"strict": true, // 是否启动严格模式
"skipLibCheck": true, // 跳过类库检测
"types": ["unplugin-vue-define-options"] // sfc 添加 name属性的包需要的
},
"exclude": [
// 排除掉哪些类库
"node_modules",
"**/__tests__",
"dist/**"
]
}
```

在项目根目录下面创建pnpm-workspace.yaml配置文件。

```
packages:
  - "packages/**" # 存放所有组件
  - docs # 文档
  - play # 测试组件
```

创建组件测试环境

```
pnpm create vite play --template vue-ts
cd play
pnpm install
```

在根目录新建一个typings目录，用来存放项目中通用的自定义的类型，然后把用vite创建的play/src下面的vite-env.d.ts移动到typings下面去。

启动测试项目, 在根目录下面的package.json下面添加scripts脚本。

```
  "scripts": {
    "dev": "pnpm -C play dev"
  }
```

先手动在根目录下面创建如下目录

```
packages
    ├─components # 存放所有的组件
    ├─utils # 存放⼯具⽅法
    └─theme-chalk # 存放对应的样式
```
在执行下面的命令，在各自的根目录下面创建package.json文件。
```
cd components && pnpm init
cd theme-chalk && pnpm init
cd utils && pnpm init
```
这个时候需要手动修改每个包的名字，让其属于z-vue3-ui的子包，我们分别进行以下的修改，在对应package.json文件中修改其name属性的值。
```
@chen-vue3-ui /components
@chen-vue3-ui/theme-thalk
@chen-vue3-ui/utils;
```
然后执行一下命令，将这三个包安装在根目录下面，注意名字哦。
```
pnpm i @chen-vue3-ui/components -w
pnpm i @chen-vue3-ui/theme-chalk -w
pnpm i @chen-vue3-ui/utils -w
```

3、引入 scss，并式实现 Bem
先手动在根目录下面创建如下目录

packages
    ├─components # 存放所有的组件
    ├─utils # 存放⼯具⽅法
    └─theme-chalk # 存放对应的样式
在执行下面的命令，在各自的根目录下面创建package.json文件。
cd components && pnpm init
cd theme-chalk && pnpm init
cd utils && pnpm init
这个时候需要手动修改每个包的名字，让其属于z-vue3-ui的子包，我们分别进行以下的修改，在对应package.json文件中修改其name属性的值。

@chen-vue3-ui /components
@chen-vue3-ui/theme-thalk
@chen-vue3-ui/utils;

然后执行一下命令，将这三个包安装在根目录下面，注意名字哦。

pnpm i @chen-vue3-ui/components -w
pnpm i @chen-vue3-ui/theme-chalk -w
pnpm i @chen-vue3-ui/utils -w

下面我们就开始实现Bem规范了。

1. Bem Js 实现部分
先来实现在js中创建class的几个函数。

utils/create.ts
```
// block 代码块
// element 元素
// modifier 装饰

// z-button
// z-button__element--disable

/**
 *
 * @param prefixName 前缀名
 * @param blockName 代码块名
 * @param elementName 元素名
 * @param modifierName 装饰符名
 * @returns  说白了 ，就是提供一个函数，用来拼接三个字符串，并用不同的符号进行分隔开来
 */
function _bem(prefixName, blockName, elementName, modifierName) {
  if (blockName) {
    prefixName += `-${blockName}`;
  }
  if (elementName) {
    prefixName += `__${elementName}`;
  }
  if (modifierName) {
    prefixName += `--${modifierName}`;
  }
  return prefixName;
}

/**
 *
 * @param prefixName 前缀
 * @returns
 */
function createBEM(prefixName: string) {
  const b = (blockName?) => _bem(prefixName, blockName, "", "");

  const e = (elementName) =>
    elementName ? _bem(prefixName, "", elementName, "") : "";

  const m = (modifierName) =>
    modifierName ? _bem(prefixName, "", "", modifierName) : "";

  const be = (blockName, elementName) =>
    blockName && elementName
      ? _bem(prefixName, blockName, elementName, "")
      : "";
  const bm = (blockName, modifierName) =>
    blockName && modifierName
      ? _bem(prefixName, blockName, "", modifierName)
      : "";
  const em = (elementName, modifierName) =>
    elementName && modifierName
      ? _bem(prefixName, "", elementName, modifierName)
      : "";
  const bem = (blockName, elementName, modifierName) =>
    blockName && elementName && modifierName
      ? _bem(prefixName, blockName, elementName, modifierName)
      : "";
  const is = (name, state?) => (state ? `is-${name}` : "");
  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  };
}

export function createNamespace(name: string) {
  const prefixName = `z-${name}`;
  return createBEM(prefixName);
}
```

下面我们找个地方，说一下上面的bem怎么使用。因为现在我们的代码都是ems的，在node环境中跑起来不方便，所以就在play测试的小模块中演示了。

const bem = createNamespace("icon");

console.log(bem.b());
console.log(bem.e("wrapper"));
console.log(bem.m("disabled"));
console.log(bem.is("checked", true));
console.log(bem.bem("box", "element", "disabled"));


2. Bem scss 部分
theme-chalk
├── package.json
└── src
    ├── icon.scss
    ├── index.scss
    ├── mixins
    │   ├── config.scss
    │   └── mixins.scss

config.scss

$namespace: "z";
$element-separator: "__"; // 元素连接符
$modifier-separator: "--"; // 修饰符连接符
$state-prefix: "is-"; // 状态连接符

* {
  box-sizing: border-box;
}

mixins.scss

```
@use "config" as *;
@forward "config";

// z-icon
@mixin b($block) {
  $B: $namespace + "-" + $block;
  .#{$B} {
    @content;
  }
}

// z-icon.is-xxx
@mixin when($state) {
  @at-root {
    &.#{$state-prefix + $state} {
      @content;
    }
  }
}

// .z-icon--primary

@mixin m($modifier) {
  @at-root {
    #{& + $modifier-separator + $modifier} {
      @content;
    }
  }
}

// z-icon__header
@mixin e($element) {
  @at-root {
    #{& + $element-separator + $element} {
      @content;
    }
  }
}
```

index.scss

```
@use "./icon.scss";
```
icon.scss
```
@use "./mixins/mixins.scss" as *;

@keyframes transform {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@include b(icon) {
  width: 1em;
  height: 1em;
  line-height: 1em;
  display: inline-flex;
  vertical-align: middle;
  svg.loading {
    animation: transform 1s linear infinite;
  }
}
```
4. 编写 Icon 组件
目录结构如下：
components
├── icon
│   ├── index.ts
│   └── src
│       ├── icon.ts
│       └── icon.vue
└── package.json

icon.vue
```
<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from "vue";
import { createNamespace } from "../../../utils/create";
import { iconProps } from "./icon";
const bem = createNamespace("icon");

defineOptions({
  name: "xIcon",
});

const props = defineProps(iconProps);

const style = computed<CSSProperties>(() => {
  if (!props.color && !props.size) {
    return {};
  }
  return {
    ...(props.size ? { "font-size": props.size + "px" } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>
```
icon.ts
```
import { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
  size: [Number, String] as PropType<number | string>,
  color: String,
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
```
index.ts
```
import _Icon from "./src/icon.vue";
import { withInstall } from "@chen-vue3-ui/utils/withInstall";

const Icon = withInstall(_Icon); // 生成带有 install 方法的组件

export default Icon; // 导出组件
export type { IconProps } from "./src/icon"; // 导出组件 props 的类型

// 这里为了给 volar 用的，具体可以看下面的文档
declare module "vue" {
  export interface GlobalComponents {
    xIcon: typeof Icon;
  }
}
```
编写一个方法用来把我们自己编写的组件包装成一个插件，方便后序导入使用，直接可以用Vue.use()

utils 下面的目录结构
utils
├── create.ts
├── package.json
└── withInstall.ts

```
import { Plugin } from "vue";

export type withInstallSFC<T> = T & Plugin;

// 给传入的组件添加一个 install 方法
export function withInstall<T>(comp: T) {
  (comp as withInstallSFC<T>).install = function (app) {
    const { name } = comp as unknown as { name: string };
    app.component(name, comp); // 这一块的类型还有点问题，还在研究中。
  };
  return comp as withInstallSFC<T>;
}
```

play
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── assets
│   └── main.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

并且在main.ts中引入样式文件，并安装sass包

mian.ts
```
import { createApp } from "vue";

import "@chen-vue3-ui/theme-chalk/src/index.scss";
import App from "./App.vue";

createApp(App).mount("#app");
```
我们的 icon 内容并不由本库提供，需要安装另一个库，这个组件只是将其进行了整合
```pnpm add @vicons/ionicons5 -w```

App.vue
```

<script setup lang="ts">
import xIcon from "@chen-vue3-ui/components/icon";
import { AccessibilityOutline } from "@vicons/ionicons5";
</script>

<template>
  <div>
    <xIcon>
      <AccessibilityOutline></AccessibilityOutline>
    </xIcon>
  </div>
</template>
```
5、Eslint 配置
npx eslint --init
6、Prettier 配置
安装插件，并添加给 vscode 添加配置文件
 添加.prettierrc.js

 添加.prettierignore
编辑器配置文件

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```
7、编辑器配置
.editorconfig

```

# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8                      # 设置文件字符集为 utf-8
indent_style = space                 # 缩进风格（tab | space）
indent_size = 2                      # 缩进大小
end_of_line = lf                     # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true      # 去除行首的任意空白字符
insert_final_newline = true          # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```
8、lint-staged 配置

```
git init
pnpm install mrm husky lint-staged -w -D
npx mrm lint-staged
```
强制执行常规提交的可共享commitlint配置。与@commitlint/cli和@commitlint/prompt-cli 一起使用。
```
pnpm install @commitlint/cli @commitlint/config-conventional -D -w
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```
commitlint.config.js
```
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build", // 编译相关的修改，例如发布版本、对项⽬构建或者依赖的改动
        "chore", // 其他修改, ⽐如改变构建流程、或者增加依赖库、⼯具等
        "ci", // 持续集成修改
        "docs", // ⽂档修改
        "feat", //新特性、新功能
        "fix", // 修改 bug
        "perf", // 优化相关，⽐如提升性能、体验
        "refactor", // 代码重构
        "revert", // 回滚到上⼀个版本
        "style", // 代码格式修改
        "test", // 测试⽤例修改
      ],
    ],
  },
};```

9、Vitepress 编写组件文档

在根目录下面创建docs文件夹，用来存放文档。

1. 安装 vitepress
```
cd docs
pnpm init
pnpm install vitepress -D # 在doc⽬录下安装
```
package.json
```
  "scripts": {
    "dev": "vitepress dev ."
  },

```  
然后在根目录下面的添加脚本
```
  "scripts": {
    "docs:dev": "pnpm -C docs dev",
  },
```

2. 创建第一篇文章
```
---
layout: home

hero:
  name:组件库
  text: 基于 Vue 3 的组件库.
  tagline: 掌握 vue3 组件编写
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickStart

features:
  - icon: 🛠️
    title: 组件库构建流程
    details: Vue3 组件库构建...
  - icon: ⚙️
    title: 组件库单元测试
    details: Vue3 组件库测试...
---
```
启动docs目录
```
pnpm run docs:dev
```

或者使用vitepress cli生成

4. 主题配置
.vitepress/theme/index.ts
```
import DefaultTheme from "vitepress/theme";
import "@chen-vue3-ui/theme-chalk/src/index.scss";
import xIcon from "@chen-vue3-ui/components/icon";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(xIcon); // 注册组件
  },
};
```
添加vite.config.ts让vite也可以支持defineOptions。

vite.config.ts

```
import { defineConfig } from "vite";
import DefineOptions from "unplugin-vue-define-options/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [DefineOptions()],
});
```
