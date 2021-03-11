# threejs-boilerplate

![screenshot](screen.gif)

## original code

- [36t/threejs\-journey at 07\-cameras\-final](https://github.com/36t/threejs-journey/tree/07-cameras-final)


## command

```
# development (include start server)
yarn start

# build (publish files to public directory)
yarn build

# add package
yarn add <package>
yarn add -D <package>

# remove package
yarn remove <package>

# eslint
yarn lint
yarn lint:fix
```

## reference

- [脱TSLintして、ESLint TypeScript Plugin に移行する \- Qiita](https://qiita.com/suzuki_sh/items/fe9b60c4f9e1dbc5d903)
- [marquizzo/three\.ts\-template: ThreeJS, TypeScript, GLSL, & Webpack boilerplate for quick prototyping\.](https://github.com/marquizzo/three.ts-template)

## bug

- 保存時にリロードしない
- 保存時に自動的に整形しない
- コミット時にlinterが走らない