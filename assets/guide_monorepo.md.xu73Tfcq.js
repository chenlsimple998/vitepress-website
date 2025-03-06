import{_ as n,c as a,o as p,ao as e}from"./chunks/framework.BO3ojR9h.js";const r=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/monorepo.md","filePath":"guide/monorepo.md","lastUpdated":1741169488000}'),l={name:"guide/monorepo.md"};function t(i,s,o,c,u,m){return p(),a("div",null,s[0]||(s[0]=[e(`<p>1、搭建 monorepo 环境 npm install pnpm -g # 全局安装pnpm pnpm init # 初始化package.json配置⽂件 私有库 pnpm install vue typescript -D # 全局下添加依赖</p><p><code>shamefully-hoist = true // 作用依赖包都扁平化的安装在node_modules下面 </code>创建tsconfig.json文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>&quot;compilerOptions&quot;: {</span></span>
<span class="line"><span>&quot;module&quot;: &quot;ESNext&quot;,</span><span> // 打包模块类型ESNext</span></span>
<span class="line"><span>&quot;declaration&quot;: false,</span><span> // 默认不要声明⽂件</span></span>
<span class="line"><span>&quot;noImplicitAny&quot;: false,</span><span> // ⽀持类型不标注可以默认any</span></span>
<span class="line"><span>&quot;removeComments&quot;: true,</span><span> // 删除注释</span></span>
<span class="line"><span>&quot;moduleResolution&quot;: &quot;node&quot;,</span><span> // 按照node模块来解析</span></span>
<span class="line"><span>&quot;esModuleInterop&quot;: true,</span><span> // ⽀持es6,commonjs模块</span></span>
<span class="line"><span>&quot;jsx&quot;: &quot;preserve&quot;,</span><span> // jsx 不转</span></span>
<span class="line"><span>&quot;noLib&quot;: false,</span><span> // 不处理类库</span></span>
<span class="line"><span>&quot;target&quot;: &quot;es6&quot;,</span><span> // 遵循es6版本</span></span>
<span class="line"><span>&quot;sourceMap&quot;: true,</span></span>
<span class="line"><span>&quot;lib&quot;: [</span></span>
<span class="line"><span>// 编译时⽤的库</span></span>
<span class="line"><span>&quot;ESNext&quot;,</span></span>
<span class="line"><span>&quot;DOM&quot;</span></span>
<span class="line"><span>],</span></span>
<span class="line"><span>&quot;allowSyntheticDefaultImports&quot;: true,</span><span> // 允许没有导出的模块中导⼊</span></span>
<span class="line"><span>&quot;experimentalDecorators&quot;: true,</span><span> // 装饰器语法</span></span>
<span class="line"><span>&quot;forceConsistentCasingInFileNames&quot;: true,</span><span> // 强制区分⼤⼩写</span></span>
<span class="line"><span>&quot;resolveJsonModule&quot;: true,</span><span> // 解析json模块</span></span>
<span class="line"><span>&quot;strict&quot;: true,</span><span> // 是否启动严格模式</span></span>
<span class="line"><span>&quot;skipLibCheck&quot;: true,</span><span> // 跳过类库检测</span></span>
<span class="line"><span>&quot;types&quot;: [&quot;unplugin-vue-define-options&quot;]</span><span> // sfc 添加 name属性的包需要的</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>&quot;exclude&quot;: [</span></span>
<span class="line"><span>// 排除掉哪些类库</span></span>
<span class="line"><span>&quot;node_modules&quot;,</span></span>
<span class="line"><span>&quot;**/__tests__&quot;,</span></span>
<span class="line"><span>&quot;dist/**&quot;</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在项目根目录下面创建pnpm-workspace.yaml配置文件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>packages:</span></span>
<span class="line"><span>  - &quot;packages/**&quot; # 存放所有组件</span></span>
<span class="line"><span>  - docs # 文档</span></span>
<span class="line"><span>  - play # 测试组件</span></span></code></pre></div><p>创建组件测试环境</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm create vite play --template vue-ts</span></span>
<span class="line"><span>cd play</span></span>
<span class="line"><span>pnpm install</span></span></code></pre></div><p>在根目录新建一个typings目录，用来存放项目中通用的自定义的类型，然后把用vite创建的play/src下面的vite-env.d.ts移动到typings下面去。</p><p>启动测试项目, 在根目录下面的package.json下面添加scripts脚本。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;dev&quot;: &quot;pnpm -C play dev&quot;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>先手动在根目录下面创建如下目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>packages</span></span>
<span class="line"><span>    ├─components # 存放所有的组件</span></span>
<span class="line"><span>    ├─utils # 存放⼯具⽅法</span></span>
<span class="line"><span>    └─theme-chalk # 存放对应的样式</span></span></code></pre></div><p>在执行下面的命令，在各自的根目录下面创建package.json文件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd components &amp;&amp; pnpm init</span></span>
<span class="line"><span>cd theme-chalk &amp;&amp; pnpm init</span></span>
<span class="line"><span>cd utils &amp;&amp; pnpm init</span></span></code></pre></div><p>这个时候需要手动修改每个包的名字，让其属于z-vue3-ui的子包，我们分别进行以下的修改，在对应package.json文件中修改其name属性的值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@chen-vue3-ui /components</span></span>
<span class="line"><span>@chen-vue3-ui/theme-thalk</span></span>
<span class="line"><span>@chen-vue3-ui/utils;</span></span></code></pre></div><p>然后执行一下命令，将这三个包安装在根目录下面，注意名字哦。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i @chen-vue3-ui/components -w</span></span>
<span class="line"><span>pnpm i @chen-vue3-ui/theme-chalk -w</span></span>
<span class="line"><span>pnpm i @chen-vue3-ui/utils -w</span></span></code></pre></div><p>3、引入 scss，并式实现 Bem 先手动在根目录下面创建如下目录</p><p>packages ├─components # 存放所有的组件 ├─utils # 存放⼯具⽅法 └─theme-chalk # 存放对应的样式 在执行下面的命令，在各自的根目录下面创建package.json文件。 cd components &amp;&amp; pnpm init cd theme-chalk &amp;&amp; pnpm init cd utils &amp;&amp; pnpm init 这个时候需要手动修改每个包的名字，让其属于z-vue3-ui的子包，我们分别进行以下的修改，在对应package.json文件中修改其name属性的值。</p><p>@chen-vue3-ui /components @chen-vue3-ui/theme-thalk @chen-vue3-ui/utils;</p><p>然后执行一下命令，将这三个包安装在根目录下面，注意名字哦。</p><p>pnpm i @chen-vue3-ui/components -w pnpm i @chen-vue3-ui/theme-chalk -w pnpm i @chen-vue3-ui/utils -w</p><p>下面我们就开始实现Bem规范了。</p><ol><li>Bem Js 实现部分 先来实现在js中创建class的几个函数。</li></ol><p>utils/create.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// block 代码块</span></span>
<span class="line"><span>// element 元素</span></span>
<span class="line"><span>// modifier 装饰</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// z-button</span></span>
<span class="line"><span>// z-button__element--disable</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @param prefixName 前缀名</span></span>
<span class="line"><span> * @param blockName 代码块名</span></span>
<span class="line"><span> * @param elementName 元素名</span></span>
<span class="line"><span> * @param modifierName 装饰符名</span></span>
<span class="line"><span> * @returns  说白了 ，就是提供一个函数，用来拼接三个字符串，并用不同的符号进行分隔开来</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function _bem(prefixName, blockName, elementName, modifierName) {</span></span>
<span class="line"><span>  if (blockName) {</span></span>
<span class="line"><span>    prefixName += \`-\${blockName}\`;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (elementName) {</span></span>
<span class="line"><span>    prefixName += \`__\${elementName}\`;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (modifierName) {</span></span>
<span class="line"><span>    prefixName += \`--\${modifierName}\`;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return prefixName;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @param prefixName 前缀</span></span>
<span class="line"><span> * @returns</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function createBEM(prefixName: string) {</span></span>
<span class="line"><span>  const b = (blockName?) =&gt; _bem(prefixName, blockName, &quot;&quot;, &quot;&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const e = (elementName) =&gt;</span></span>
<span class="line"><span>    elementName ? _bem(prefixName, &quot;&quot;, elementName, &quot;&quot;) : &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const m = (modifierName) =&gt;</span></span>
<span class="line"><span>    modifierName ? _bem(prefixName, &quot;&quot;, &quot;&quot;, modifierName) : &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const be = (blockName, elementName) =&gt;</span></span>
<span class="line"><span>    blockName &amp;&amp; elementName</span></span>
<span class="line"><span>      ? _bem(prefixName, blockName, elementName, &quot;&quot;)</span></span>
<span class="line"><span>      : &quot;&quot;;</span></span>
<span class="line"><span>  const bm = (blockName, modifierName) =&gt;</span></span>
<span class="line"><span>    blockName &amp;&amp; modifierName</span></span>
<span class="line"><span>      ? _bem(prefixName, blockName, &quot;&quot;, modifierName)</span></span>
<span class="line"><span>      : &quot;&quot;;</span></span>
<span class="line"><span>  const em = (elementName, modifierName) =&gt;</span></span>
<span class="line"><span>    elementName &amp;&amp; modifierName</span></span>
<span class="line"><span>      ? _bem(prefixName, &quot;&quot;, elementName, modifierName)</span></span>
<span class="line"><span>      : &quot;&quot;;</span></span>
<span class="line"><span>  const bem = (blockName, elementName, modifierName) =&gt;</span></span>
<span class="line"><span>    blockName &amp;&amp; elementName &amp;&amp; modifierName</span></span>
<span class="line"><span>      ? _bem(prefixName, blockName, elementName, modifierName)</span></span>
<span class="line"><span>      : &quot;&quot;;</span></span>
<span class="line"><span>  const is = (name, state?) =&gt; (state ? \`is-\${name}\` : &quot;&quot;);</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    b,</span></span>
<span class="line"><span>    e,</span></span>
<span class="line"><span>    m,</span></span>
<span class="line"><span>    be,</span></span>
<span class="line"><span>    bm,</span></span>
<span class="line"><span>    em,</span></span>
<span class="line"><span>    bem,</span></span>
<span class="line"><span>    is,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function createNamespace(name: string) {</span></span>
<span class="line"><span>  const prefixName = \`z-\${name}\`;</span></span>
<span class="line"><span>  return createBEM(prefixName);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>下面我们找个地方，说一下上面的bem怎么使用。因为现在我们的代码都是ems的，在node环境中跑起来不方便，所以就在play测试的小模块中演示了。</p><p>const bem = createNamespace(&quot;icon&quot;);</p><p>console.log(bem.b()); console.log(bem.e(&quot;wrapper&quot;)); console.log(bem.m(&quot;disabled&quot;)); console.log(bem.is(&quot;checked&quot;, true)); console.log(bem.bem(&quot;box&quot;, &quot;element&quot;, &quot;disabled&quot;));</p><ol start="2"><li>Bem scss 部分 theme-chalk ├── package.json └── src ├── icon.scss ├── index.scss ├── mixins │ ├── config.scss │ └── mixins.scss</li></ol><p>config.scss</p><p>$namespace: &quot;z&quot;; $element-separator: &quot;__&quot;; // 元素连接符 $modifier-separator: &quot;--&quot;; // 修饰符连接符 $state-prefix: &quot;is-&quot;; // 状态连接符</p><ul><li>{ box-sizing: border-box; }</li></ul><p>mixins.scss</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@use &quot;config&quot; as *;</span></span>
<span class="line"><span>@forward &quot;config&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// z-icon</span></span>
<span class="line"><span>@mixin b($block) {</span></span>
<span class="line"><span>  $B: $namespace + &quot;-&quot; + $block;</span></span>
<span class="line"><span>  .#{$B} {</span></span>
<span class="line"><span>    @content;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// z-icon.is-xxx</span></span>
<span class="line"><span>@mixin when($state) {</span></span>
<span class="line"><span>  @at-root {</span></span>
<span class="line"><span>    &amp;.#{$state-prefix + $state} {</span></span>
<span class="line"><span>      @content;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// .z-icon--primary</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@mixin m($modifier) {</span></span>
<span class="line"><span>  @at-root {</span></span>
<span class="line"><span>    #{&amp; + $modifier-separator + $modifier} {</span></span>
<span class="line"><span>      @content;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// z-icon__header</span></span>
<span class="line"><span>@mixin e($element) {</span></span>
<span class="line"><span>  @at-root {</span></span>
<span class="line"><span>    #{&amp; + $element-separator + $element} {</span></span>
<span class="line"><span>      @content;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>index.scss</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@use &quot;./icon.scss&quot;;</span></span></code></pre></div><p>icon.scss</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@use &quot;./mixins/mixins.scss&quot; as *;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@keyframes transform {</span></span>
<span class="line"><span>  from {</span></span>
<span class="line"><span>    transform: rotate(0deg);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  to {</span></span>
<span class="line"><span>    transform: rotate(360deg);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@include b(icon) {</span></span>
<span class="line"><span>  width: 1em;</span></span>
<span class="line"><span>  height: 1em;</span></span>
<span class="line"><span>  line-height: 1em;</span></span>
<span class="line"><span>  display: inline-flex;</span></span>
<span class="line"><span>  vertical-align: middle;</span></span>
<span class="line"><span>  svg.loading {</span></span>
<span class="line"><span>    animation: transform 1s linear infinite;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="4"><li>编写 Icon 组件 目录结构如下： components ├── icon │ ├── index.ts │ └── src │ ├── icon.ts │ └── icon.vue └── package.json</li></ol><p>icon.vue</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;i :class=&quot;bem.b()&quot; :style=&quot;style&quot;&gt;</span></span>
<span class="line"><span>    &lt;slot&gt;&lt;/slot&gt;</span></span>
<span class="line"><span>  &lt;/i&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import { computed, CSSProperties } from &quot;vue&quot;;</span></span>
<span class="line"><span>import { createNamespace } from &quot;../../../utils/create&quot;;</span></span>
<span class="line"><span>import { iconProps } from &quot;./icon&quot;;</span></span>
<span class="line"><span>const bem = createNamespace(&quot;icon&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defineOptions({</span></span>
<span class="line"><span>  name: &quot;xIcon&quot;,</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const props = defineProps(iconProps);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const style = computed&lt;CSSProperties&gt;(() =&gt; {</span></span>
<span class="line"><span>  if (!props.color &amp;&amp; !props.size) {</span></span>
<span class="line"><span>    return {};</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    ...(props.size ? { &quot;font-size&quot;: props.size + &quot;px&quot; } : {}),</span></span>
<span class="line"><span>    ...(props.color ? { color: props.color } : {}),</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><p>icon.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { ExtractPropTypes, PropType } from &quot;vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const iconProps = {</span></span>
<span class="line"><span>  size: [Number, String] as PropType&lt;number | string&gt;,</span></span>
<span class="line"><span>  color: String,</span></span>
<span class="line"><span>} as const;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export type IconProps = ExtractPropTypes&lt;typeof iconProps&gt;;</span></span></code></pre></div><p>index.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import _Icon from &quot;./src/icon.vue&quot;;</span></span>
<span class="line"><span>import { withInstall } from &quot;@chen-vue3-ui/utils/withInstall&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const Icon = withInstall(_Icon); // 生成带有 install 方法的组件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default Icon; // 导出组件</span></span>
<span class="line"><span>export type { IconProps } from &quot;./src/icon&quot;; // 导出组件 props 的类型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 这里为了给 volar 用的，具体可以看下面的文档</span></span>
<span class="line"><span>declare module &quot;vue&quot; {</span></span>
<span class="line"><span>  export interface GlobalComponents {</span></span>
<span class="line"><span>    xIcon: typeof Icon;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编写一个方法用来把我们自己编写的组件包装成一个插件，方便后序导入使用，直接可以用Vue.use()</p><p>utils 下面的目录结构 utils ├── create.ts ├── package.json └── withInstall.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Plugin } from &quot;vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export type withInstallSFC&lt;T&gt; = T &amp; Plugin;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 给传入的组件添加一个 install 方法</span></span>
<span class="line"><span>export function withInstall&lt;T&gt;(comp: T) {</span></span>
<span class="line"><span>  (comp as withInstallSFC&lt;T&gt;).install = function (app) {</span></span>
<span class="line"><span>    const { name } = comp as unknown as { name: string };</span></span>
<span class="line"><span>    app.component(name, comp); // 这一块的类型还有点问题，还在研究中。</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  return comp as withInstallSFC&lt;T&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>play ├── README.md ├── index.html ├── package.json ├── pnpm-lock.yaml ├── public │ └── vite.svg ├── src │ ├── App.vue │ ├── assets │ └── main.ts ├── tsconfig.json ├── tsconfig.node.json └── vite.config.ts</p><p>并且在main.ts中引入样式文件，并安装sass包</p><p>mian.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { createApp } from &quot;vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;@chen-vue3-ui/theme-chalk/src/index.scss&quot;;</span></span>
<span class="line"><span>import App from &quot;./App.vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>createApp(App).mount(&quot;#app&quot;);</span></span></code></pre></div><p>我们的 icon 内容并不由本库提供，需要安装另一个库，这个组件只是将其进行了整合 <code>pnpm add @vicons/ionicons5 -w</code></p><p>App.vue</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import xIcon from &quot;@chen-vue3-ui/components/icon&quot;;</span></span>
<span class="line"><span>import { AccessibilityOutline } from &quot;@vicons/ionicons5&quot;;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;xIcon&gt;</span></span>
<span class="line"><span>      &lt;AccessibilityOutline&gt;&lt;/AccessibilityOutline&gt;</span></span>
<span class="line"><span>    &lt;/xIcon&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre></div><p>5、Eslint 配置 npx eslint --init 6、Prettier 配置 安装插件，并添加给 vscode 添加配置文件 添加.prettierrc.js</p><p>添加.prettierignore 编辑器配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;editor.defaultFormatter&quot;: &quot;esbenp.prettier-vscode&quot;,</span></span>
<span class="line"><span>  &quot;editor.formatOnSave&quot;: true</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>7、编辑器配置 .editorconfig</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span># http://editorconfig.org</span></span>
<span class="line"><span></span></span>
<span class="line"><span>root = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[*] # 表示所有文件适用</span></span>
<span class="line"><span>charset = utf-8                      # 设置文件字符集为 utf-8</span></span>
<span class="line"><span>indent_style = space                 # 缩进风格（tab | space）</span></span>
<span class="line"><span>indent_size = 2                      # 缩进大小</span></span>
<span class="line"><span>end_of_line = lf                     # 控制换行类型(lf | cr | crlf)</span></span>
<span class="line"><span>trim_trailing_whitespace = true      # 去除行首的任意空白字符</span></span>
<span class="line"><span>insert_final_newline = true          # 始终在文件末尾插入一个新行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[*.md] # 表示仅 md 文件适用以下规则</span></span>
<span class="line"><span>max_line_length = off</span></span>
<span class="line"><span>trim_trailing_whitespace = false</span></span></code></pre></div><p>8、lint-staged 配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git init</span></span>
<span class="line"><span>pnpm install mrm husky lint-staged -w -D</span></span>
<span class="line"><span>npx mrm lint-staged</span></span></code></pre></div><p>强制执行常规提交的可共享commitlint配置。与@commitlint/cli和@commitlint/prompt-cli 一起使用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm install @commitlint/cli @commitlint/config-conventional -D -w</span></span>
<span class="line"><span>npx husky add .husky/commit-msg &quot;npx --no-install commitlint --edit $1&quot;</span></span></code></pre></div><p>commitlint.config.js</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  extends: [&quot;@commitlint/config-conventional&quot;],</span></span>
<span class="line"><span>  rules: {</span></span>
<span class="line"><span>    &quot;type-enum&quot;: [</span></span>
<span class="line"><span>      2,</span></span>
<span class="line"><span>      &quot;always&quot;,</span></span>
<span class="line"><span>      [</span></span>
<span class="line"><span>        &quot;build&quot;,</span><span> // 编译相关的修改，例如发布版本、对项⽬构建或者依赖的改动</span></span>
<span class="line"><span>        &quot;chore&quot;,</span><span> // 其他修改, ⽐如改变构建流程、或者增加依赖库、⼯具等</span></span>
<span class="line"><span>        &quot;ci&quot;,</span><span> // 持续集成修改</span></span>
<span class="line"><span>        &quot;docs&quot;,</span><span> // ⽂档修改</span></span>
<span class="line"><span>        &quot;feat&quot;,</span><span> //新特性、新功能</span></span>
<span class="line"><span>        &quot;fix&quot;,</span><span> // 修改 bug</span></span>
<span class="line"><span>        &quot;perf&quot;,</span><span> // 优化相关，⽐如提升性能、体验</span></span>
<span class="line"><span>        &quot;refactor&quot;,</span><span> // 代码重构</span></span>
<span class="line"><span>        &quot;revert&quot;,</span><span> // 回滚到上⼀个版本</span></span>
<span class="line"><span>        &quot;style&quot;,</span><span> // 代码格式修改</span></span>
<span class="line"><span>        &quot;test&quot;,</span><span> // 测试⽤例修改</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>9、Vitepress 编写组件文档</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在根目录下面创建docs文件夹，用来存放文档。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 安装 vitepress</span></span></code></pre></div><p>cd docs pnpm init pnpm install vitepress -D # 在doc⽬录下安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package.json</span></span></code></pre></div><p>&quot;scripts&quot;: { &quot;dev&quot;: &quot;vitepress dev .&quot; },</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>然后在根目录下面的添加脚本</span></span></code></pre></div><p>&quot;scripts&quot;: { &quot;docs:dev&quot;: &quot;pnpm -C docs dev&quot;, },</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>2. 创建第一篇文章</span></span></code></pre></div><hr><p>layout: home</p><p>hero: name:组件库 text: 基于 Vue 3 的组件库. tagline: 掌握 vue3 组件编写 actions: - theme: brand text: 快速开始 link: /guide/quickStart</p><p>features:</p><ul><li>icon: 🛠️ title: 组件库构建流程 details: Vue3 组件库构建...</li><li>icon: ⚙️ title: 组件库单元测试 details: Vue3 组件库测试...</li></ul><hr><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>启动docs目录</span></span></code></pre></div><p>pnpm run docs:dev</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>或者使用vitepress cli生成</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. 主题配置</span></span>
<span class="line"><span>.vitepress/theme/index.ts</span></span></code></pre></div><p>import DefaultTheme from &quot;vitepress/theme&quot;; import &quot;@chen-vue3-ui/theme-chalk/src/index.scss&quot;; import xIcon from &quot;@chen-vue3-ui/components/icon&quot;;</p><p>export default { ...DefaultTheme, enhanceApp({ app }) { app.use(xIcon); // 注册组件 }, };</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>添加vite.config.ts让vite也可以支持defineOptions。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vite.config.ts</span></span></code></pre></div><p>import { defineConfig } from &quot;vite&quot;; import DefineOptions from &quot;unplugin-vue-define-options/vite&quot;;</p><p>// <a href="https://vitejs.dev/config/" target="_blank" rel="noreferrer">https://vitejs.dev/config/</a> export default defineConfig({ plugins: [DefineOptions()], });</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span></code></pre></div>`,89)]))}const g=n(l,[["render",t]]);export{r as __pageData,g as default};
