import{_ as a,c as n,o as e,ao as p}from"./chunks/framework.BO3ojR9h.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/githubPages.md","filePath":"guide/githubPages.md","lastUpdated":1741271505000}'),i={name:"guide/githubPages.md"};function l(t,s,o,c,d,r){return e(),n("div",null,s[0]||(s[0]=[p(`<p>配置 GitHub Pages 登录 GitHub，进入你的项目仓库。 点击仓库的 “Settings” 选项卡。 在左侧导航栏中找到 “Pages”。 在 “Source” 部分，选择 gh-pages 分支，然后点击 “Save”。</p><p>github pages 部署配置 .github/workflows/deploy.yml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>name: Deploy to GitHub Pages</span></span>
<span class="line"><span></span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    branches:</span></span>
<span class="line"><span>      - main</span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  deploy:</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    permissions:</span></span>
<span class="line"><span>      contents: write  # 授予写入仓库内容的权限</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      - uses: actions/checkout@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          fetch-depth: 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Setup Node.js</span></span>
<span class="line"><span>        uses: actions/setup-node@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          node-version: 20</span></span>
<span class="line"><span>          cache: &#39;npm&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Install npm</span></span>
<span class="line"><span>        working-directory: ./docs</span></span>
<span class="line"><span>        run: |</span></span>
<span class="line"><span>          npm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Install dependencies</span></span>
<span class="line"><span>        working-directory: ./docs</span></span>
<span class="line"><span>        run: |</span></span>
<span class="line"><span>          npm run docs:build     </span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Build VitePress site</span></span>
<span class="line"><span>        working-directory: ./docs</span></span>
<span class="line"><span>        run: npm run docs:build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Create .nojekyll file</span></span>
<span class="line"><span>        run: touch ./docs/.vitepress/dist/.nojekyll</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      - name: Deploy to GitHub Pages</span></span>
<span class="line"><span>        uses: peaceiris/actions-gh-pages@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          github_token: \${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"><span>          publish_dir: ./docs/.vitepress/dist</span></span></code></pre></div><p>当静态网站打包后样式不显示的时候可能是2种问题 1.nojekyll文件 2.config.mts里面的配置文件 里面的 base:&#39;&#39; 路径不对</p><p>注意.nojekyll .nojekyll” 是一个特殊的空文件，通常用于在使用 GitHub Pages 等基于 Jekyll 的静态网站托管服务时 而当你在仓库的根目录下放置一个名为 “.nojekyll” 的空文件时，它会告诉 GitHub Pages 不要使用 Jekyll 来处理你的网站，而是直接使用你仓库中的静态文件（如 HTML、CSS、JavaScript 文件等）来呈现网站，跳过 Jekyll 的构建过程</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>      - name: Create .nojekyll file</span></span>
<span class="line"><span>        run: touch ./docs/.vitepress/dist/.nojekyll</span></span></code></pre></div><p>脚本里面授予写入仓库内容的权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>      contents: write  # 授予写入仓库内容的权限</span></span></code></pre></div><p>当打包后的 GitHub Pages 没有样式时，可能由以下原因导致：</p><h3 id="_1-nojekyll-文件缺失" tabindex="-1">1. <code>.nojekyll</code> 文件缺失 <a class="header-anchor" href="#_1-nojekyll-文件缺失" aria-label="Permalink to &quot;1. \`.nojekyll\` 文件缺失&quot;">​</a></h3><p>在使用 GitHub Pages 时，默认情况下它会尝试使用 Jekyll 来构建网站。如果你的项目不是基于 Jekyll 的，或者你希望直接使用静态文件来呈现网站，就需要在仓库的根目录下放置一个名为 <code>.nojekyll</code> 的空文件。这样可以告诉 GitHub Pages 跳过 Jekyll 的构建过程，直接使用仓库中的静态文件。</p><p>从你提供的代码片段中可以看到，在部署脚本里有创建 <code>.nojekyll</code> 文件的步骤：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Create .nojekyll file</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">touch ./docs/.vitepress/dist/.nojekyll</span></span></code></pre></div><p>确保这个步骤成功执行，并且 <code>.nojekyll</code> 文件确实存在于 <code>./docs/.vitepress/dist/</code> 目录下。</p><h3 id="_2-config-mts-里的-base-路径配置错误" tabindex="-1">2. <code>config.mts</code> 里的 <code>base</code> 路径配置错误 <a class="header-anchor" href="#_2-config-mts-里的-base-路径配置错误" aria-label="Permalink to &quot;2. \`config.mts\` 里的 \`base\` 路径配置错误&quot;">​</a></h3><p>在 VitePress 项目中，<code>config.mts</code>（或 <code>config.js</code>）文件中的 <code>base</code> 选项用于指定项目的基础路径。如果这个路径配置不正确，可能会导致样式文件等静态资源无法正确加载。</p><p>在 <code>package.json</code> 中，构建命令里设置了 <code>base</code> 路径：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;docs:build&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pnpm run register:components &amp;&amp; vitepress build docs --base /vitepress-demo/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span></code></pre></div><p>确保 <code>base</code> 路径与你的 GitHub Pages 部署路径一致。例如，如果你的仓库名为 <code>vitepress-demo</code>，并且部署到 <code>https://&lt;username&gt;.github.io/vitepress-demo/</code>，那么 <code>base</code> 应该设置为 <code>/vitepress-demo/</code>。</p><h3 id="_3-静态资源路径问题" tabindex="-1">3. 静态资源路径问题 <a class="header-anchor" href="#_3-静态资源路径问题" aria-label="Permalink to &quot;3. 静态资源路径问题&quot;">​</a></h3><p>检查 CSS 文件和其他静态资源的引用路径是否正确。在 VitePress 项目中，样式文件通常通过相对路径引用。确保在打包后，这些相对路径仍然有效。</p><p>例如，在 <code>vitepress-website/src/styles/index.css</code> 和 <code>vitepress-website/docs/styles/index.css</code> 中定义的样式，确保在打包后的 HTML 文件中正确引用了这些 CSS 文件。</p><h3 id="_4-缓存问题" tabindex="-1">4. 缓存问题 <a class="header-anchor" href="#_4-缓存问题" aria-label="Permalink to &quot;4. 缓存问题&quot;">​</a></h3><p>有时候浏览器会缓存旧的样式文件，导致新的样式没有生效。可以尝试在浏览器中清除缓存，或者使用隐身模式访问网站，以确保加载的是最新的样式文件。</p><p>综上所述，你可以按照上述步骤逐一排查问题，找出导致样式无法显示的原因。</p><h3 id="_4-注意路径-deploy-yml路径不对可能不会生效分支gf-pages" tabindex="-1">4. 注意路径 deploy.yml路径不对可能不会生效分支gf-pages <a class="header-anchor" href="#_4-注意路径-deploy-yml路径不对可能不会生效分支gf-pages" aria-label="Permalink to &quot;4. 注意路径   deploy.yml路径不对可能不会生效分支gf-pages&quot;">​</a></h3><p>.github/workflows/deploy.yml</p>`,27)]))}const g=a(i,[["render",l]]);export{u as __pageData,g as default};
