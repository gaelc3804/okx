export const cn = {
  login: {
    title: '登录',
    inputUserLabel: {
      phone: '手机',
      email: '邮箱 / 子账户',
      qr: '二维码'
    },
    nextButton: {
      next: '下一步',
      login: 'Log In'
    },
    inputPassLabel: {
      label: '密码',
      forgotLable: '忘记密码？'
    },
    dontHaveAccount: "还没有账号？",
    signUpLabel: '立即注册',
    captchaLabel: {
      label: "本网站受 Google reCAPTCHA 保护，以确保您不是机器人。",
      learMore: '了解更多'
    },
    header: {
      logoUrl: 'data:image/png;base64,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',
      buyCrypto: '买币',
      discover: '发现',
      trade: '交易',
      grow: '金融',
      buid: '公链',
      institutional: '机构客户',
      Learn: '新手',
      More: '更多',
      loginLabel: '登录',
      signUpButtonLabel: '注册'
    },
    banner: {
      title: '安心交易！',
      subtitle: '欧易对您的资产持有 1:1 的储备金，我们也会定期发布储备金证明审计结果',
      joinTelegramTitle: '加入我们的 Telegram 社区',
      joinTelegramSub: '学课程、享福利、共交流'
    }
  },
}