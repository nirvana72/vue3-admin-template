# 项目依赖

# docker 开发环境

```
docker run --name=nodejs -p 3000:3000 -v E:/workspace:/workspace -itd node:14.18.0-alpine
```

- node v14.18.0
- npm 7.24.1

### npm 更新

```
npm install -g npm@7.24.1

npm config set registry https://registry.npm.taobao.org
```

## 创建 vite 项目

> https://vitejs.cn/guide/#%E6%90%AD%E5%BB%BA%E7%AC%AC%E4%B8%80%E4%B8%AA-vite-%E9%A1%B9%E7%9B%AE

```
npm init @vitejs/app xxxx
```

## 代码风格

### Eslint

- vscode 安装 eslint 插件, 增加代码风格提示

```
# 安装  eslint
npm i -D eslint

# 初始化eslint 配置文件, 很多选项，根据自己的项目决定
npx eslint --init

# 用 eslint 命令检查代码风格
eslint demo.ts

# 自动修复代码风格
eslint demo.ts --fix
```

### prettier

- vscode 安装 prettier 插件
- 手动创建 .prettierrc.json

```
npm i prettier -D

# 修复 dmeo.ts 文件命令
npx prettier -write demo.ts
```

- .vscode/settings.json

```
{
  // 保存后自动格式化
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 行尾序列号
  "files.eol": "\n",
  // 单行最大长度
  "prettier.printWidth": 120,
}
```

### 代码提交前验证

```
npm i -D pre-commit

npm i -D eslint-plugin-prettier

npm i -D eslint-plugin-vue

npm i -D @typescript-eslint/eslint-plugin
```

- package.json

```
"scripts": {
    ...
    "lint:eslint": "eslint --cache --max-warnings 0  \"{src,mock}/**/*.{vue,ts,tsx}\""
  },
  "pre-commit": [
    "lint:eslint"
  ],
```
