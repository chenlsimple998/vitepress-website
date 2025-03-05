配置 GitHub Pages
登录 GitHub，进入你的项目仓库。
点击仓库的 “Settings” 选项卡。
在左侧导航栏中找到 “Pages”。
在 “Source” 部分，选择 gh-pages 分支，然后点击 “Save”。

github pages 部署配置  .github/workflows/deploy.yml
```
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write  # 授予写入仓库内容的权限
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'

      - name: Install npm
        working-directory: ./docs
        run: |
          npm install

      - name: Install dependencies
        working-directory: ./docs
        run: |
          npm run docs:build     

      - name: Build VitePress site
        working-directory: ./docs
        run: npm run docs:build

      - name: Create .nojekyll file
        run: touch ./docs/.vitepress/dist/.nojekyll

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
          
```
当静态网站打包后样式不显示的时候可能是2种问题
1.nojekyll文件
2.config.mts里面的配置文件 里面的  base:''  路径不对
   

注意.nojekyll
.nojekyll” 是一个特殊的空文件，通常用于在使用 GitHub Pages 等基于 Jekyll 的静态网站托管服务时
而当你在仓库的根目录下放置一个名为 “.nojekyll” 的空文件时，它会告诉 GitHub Pages 不要使用 Jekyll 来处理你的网站，而是直接使用你仓库中的静态文件（如 HTML、CSS、JavaScript 文件等）来呈现网站，跳过 Jekyll 的构建过程
```
      - name: Create .nojekyll file
        run: touch ./docs/.vitepress/dist/.nojekyll
```
脚本里面授予写入仓库内容的权限
```
      contents: write  # 授予写入仓库内容的权限
```

