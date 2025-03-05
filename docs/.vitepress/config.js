import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import nav from './configs/nav'
import sidebar from './configs/sidebar'

export default defineConfig({
  // lang: 'en-US',
  title: 'Vitepress',
  description: '使用 Vitepress 搭建组件库文档站点。',

  lastUpdated: true,
  cleanUrls: true,

  base: process.env.BASE || '/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'CodeBgWall'
      }
    }
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },

    config: (md) => {
  
      // const { createRequire } = require('module');
      // const require = createRequire(import.meta.url);
      // const { createVuePlugin } = require('vitepress-plugin-vue');
      // md.use(createVuePlugin());
      md.use(demoblockPlugin, {
        customClass: 'demoblock-custom'
      })
    }
  },

  vite: {
    plugins: [demoblockVitePlugin(), vueJsx()],
    resolve: {
      alias: {
        '@alias': path.resolve(__dirname, '../')
      }
    }
  },

  // vue: {},

  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/logo.jpg',

    search: {
      provider: 'local',
      // provider: 'algolia',
      // options: {
      //   appId: 'X51HWTCQJJ',
      //   apiKey: 'ca20f15eb8a667898b65d13f4213ae3d',
      //   indexName: 'vitepress-demo'
      // }
    },

    // nav
    nav,

    // sidebar
    sidebar,

    editLink: {
      pattern: '',
      text: '在 GitHub 上编辑此页'
    },

    socialLinks: [
      { icon: 'github', link: '' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © chen: 836502030@qq.com'
    }
  }
})
