export default {
  '/api/': getApiSidebar(),
  '/components/': getComponentsSidebar(),
  '/guide/': getGuideSidebar()
}

function getApiSidebar() {
  return [
    {
      text: '功能',
      collapsible: true,
      items: [
        {
          text: '已实现',
          link: '/api/'
        },
      ]
    }
  ]
}

function getComponentsSidebar() {
  return [
    {
      text: '组件',
      items: [
        {
          text: 'Button 按钮',
          link: '/components/button'
        },
      ]
    }
  ]
}

function getGuideSidebar() {
  return [
    {
      text: '指南',
      items: [
        {
          text: 'button',
          link: '/guide/button'
        },
        {
          text: '基于monorepo搭建前端组件库',
          link: '/guide/monorepo'
        },
        {
          text: 'githubPages注意事项',
          link: '/guide/githubPages'
        },
        {
          text: 'vue2升级vue3',
          link: '/guide/vue2ToVue3'
        },
        {
          text: '持续集成',
          link: '/guide/CICD'
        },
        {
          text: 'NPM私服',
          link: '/guide/npm私服'
        },
        {
          text: 'webpack学习思维导图',
          link: 'https://note.youdao.com/s/YSWabFj8'
        },
        {
          text: '数字大屏',
          link: '/guide/githubVue'
        },
        // {
        //   text: 'react',
        //   link: ''
        // },
        {
          text: 'threejs',
          link: '/guide/githubVue'
        },
        {
          text: 'cesium',
          link: '/guide/githubVue'
        },
      ]
    }
  ]
}

