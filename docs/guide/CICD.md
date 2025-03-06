CI（持续集成）和CD（持续交付）是一种自动构建和部署代码的方法。
CI是将代码持续集成到存储库的主分支中，并对代码进行自动测试的实践。
CD可让代码达到可交付状态，这样只需单击一个按钮就可以部署这部分代码，或者在持续部署的情况下，如果所有测试都通过，则自动部署代码。
前端实现持续集成和持续部署（CI/CD）可以帮助提高开发效率、保证代码质量并实现快速迭代。以下是一个常见的前端项目实现 CI/CD 的一般流程和方法，以使用 GitHub Actions 为例：
### 1. 项目准备
确保你的前端项目是一个 Git 仓库，并且已经包含了必要的配置文件，如 `package.json` 用于管理项目依赖和脚本。例如，一个基于 Vue 3 + Vite 的项目，`package.json` 可能包含以下脚本：
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 2. 选择 CI/CD 工具
常见的 CI/CD 工具有 GitHub Actions、GitLab CI/CD、以 GitHub Actions 为例，它与 GitHub 仓库集成紧密，使用 YAML 文件配置工作流。

### 3. 创建 GitHub Actions 工作流文件
在项目仓库的 `.github/workflows` 目录下创建一个 YAML 文件，例如 `ci-cd.yml`。以下是一个简单的示例，用于实现前端项目的构建、测试和部署到 GitHub Pages：

```yaml
name: Frontend CI/CD

on:
  push:
    branches:
      - main  # 监听 main 分支的推送事件，可根据实际情况修改

jobs:
  build_and_test:
    runs-on: ubuntu-latest  # 使用最新的 Ubuntu 运行环境
    steps:
      - name: Checkout code
        uses: actions/checkout@v3  # 检出代码到运行环境

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'  # 设置 Node.js 版本

      - name: Install dependencies
        run: npm install  # 安装项目依赖

      - name: Run tests
        run: npm run test:unit  # 运行单元测试，根据项目实际脚本修改

      - name: Build project
        run: npm run build  # 构建项目

  deploy:
    needs: build_and_test  # 依赖于 build_and_test 任务成功完成
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}  # 使用 GitHub 提供的令牌
          publish_dir:./dist  # 构建产物所在目录，根据实际情况修改
```

### 4. 配置说明
- **`on` 部分**：定义触发工作流的事件，这里是当 `main` 分支有代码推送时触发。
- **`jobs` 部分**：包含多个任务，`build_and_test` 任务负责检出代码、安装依赖、运行测试和构建项目；`deploy` 任务依赖于 `build_and_test` 任务的成功，负责将构建产物部署到 GitHub Pages。
- **`secrets.GITHUB_TOKEN`**：这是 GitHub 提供的一个加密令牌，用于在工作流中进行身份验证，以访问仓库并进行部署操作。

### 5. 执行 CI/CD
当你推送代码到指定的分支（这里是 `main` 分支）时，GitHub Actions 会自动触发配置的工作流。你可以在仓库的 “Actions” 选项卡中查看工作流的执行状态和日志，以便及时发现和解决问题。
