module.exports = {
    root: true, // これを設定しないと、このファイルの親階層よりも先を探しにいく↑
    env: { // 検証するJavaScritpの実行環境を指定
        browser: true, // ブラウザで動作させる。console.logを指定してもエラーが発生しない
        es2020: true, // es2020までの構文を指定してもエラーでなくなる、es6、es2017も指定できる
    },
    parserOptions: {
        sourceType: 'module', // import構文を指定してもエラーがでなくなる
        // ecmaVersion: 11, es2020を指定すると、これが自動で設定される
    },
    extends: [
        'eslint:recommended', // 外部で適用されるeslintの外部ルールを設定する。こちらはeslintのおすすめの設定になる
        'plugin:prettier/recommended' // prettierの設定を有効に (eslint-config-prettier,eslint-plugin-prettierが必要)。extendsの配列の最後に書く事
    ],
    rules: {// ルールを指定extendsのルールと重複した場合、こちらが優先される
        'prefer-const': 'error', // 更新をしない宣言にconst以外を指定していたらエラーが出る
    }
}
