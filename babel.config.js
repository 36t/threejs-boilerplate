module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // ポリフィルの設定を追加 (babel/preset-envのオプションを設定)
      {
        useBuiltIns: 'usage', // usageにすることで必要なポリフィルのみを取り込んでいる
        corejs: 3, // corejsのバージョン。設定しない場合２でエラーがでる
        debug: true // 取り込まれたポリフィルの情報が出力、確認用のオプションなので、不要の場合は削除しても良い
      }
    ]
  ]
}
