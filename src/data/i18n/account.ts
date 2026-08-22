import type {
  SupportedLocale,
} from "@/data/shared";

export type AccountDictionary = {
  dateLocale: "en" | "zh-CN";
  shared: {
    loading: string;
    accountHome: string;
    serviceUnavailable: string;
    retry: string;
    anonymousNote: string;
    disclaimer: string;
  };
  header: {
    login: string;
    loadingLabel: string;
    accountLabel: string;
  };
  fields: {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    verificationToken: string;
  };
  errors: {
    invalidEmail: string;
    invalidNickname: string;
    invalidPassword: string;
    passwordMismatch: string;
    credentials: string;
    emailConflict: string;
    emailDelivery: string;
    invalidToken: string;
    validation: string;
    unavailable: string;
    generic: string;
  };
  register: {
    eyebrow: string;
    title: string;
    description: string;
    submit: string;
    submitting: string;
    haveAccount: string;
    login: string;
    successEyebrow: string;
    successTitle: string;
    successDescription: string;
    unverified: string;
    emailServicePending: string;
    goToLogin: string;
    goToVerification: string;
    developmentVerification: string;
    alreadyAuthenticated: string;
  };
  login: {
    eyebrow: string;
    title: string;
    description: string;
    submit: string;
    submitting: string;
    noAccount: string;
    register: string;
    alreadyAuthenticated: string;
    enterAccount: string;
    forgotPassword: string;
  };
  forgot: {
    eyebrow: string;
    title: string;
    description: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDescription: string;
    backToLogin: string;
  };
  reset: {
    eyebrow: string;
    title: string;
    description: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDescription: string;
    login: string;
  };
  verification: {
    eyebrow: string;
    title: string;
    description: string;
    tokenFromLink: string;
    manualInstruction: string;
    submit: string;
    submitting: string;
    successEyebrow: string;
    successTitle: string;
    successDescription: string;
    goToAccount: string;
  };
  ownership: {
    eyebrow: string;
    title: string;
    description: string;
    checkingAccount: string;
    loginRequired: string;
    loginAction: string;
    verificationRequired: string;
    verificationAction: string;
    missingCredential: string;
    invalidCredential: string;
    save: string;
    saving: string;
    retry: string;
    savedTitle: string;
    savedDescription: string;
    error: string;
  };
  dashboard: {
    eyebrow: string;
    title: string;
    description: string;
    loginRequiredTitle: string;
    loginRequiredDescription: string;
    login: string;
    register: string;
    nickname: string;
    email: string;
    verificationStatus: string;
    createdAt: string;
    verified: string;
    unverified: string;
    unverifiedLimitation: string;
    verifyEmail: string;
    resendVerification: string;
    resendingVerification: string;
    resendComplete: string;
    logout: string;
    loggingOut: string;
    nextPhase: string;
    upcomingTitle: string;
    upcomingDescription: string;
    modules: readonly {
      id: string;
      title: string;
      description: string;
    }[];
    history: {
      title: string;
      description: string;
      loading: string;
      error: string;
      retry: string;
      empty: string;
      openResult: string;
      saved: string;
      personality: string;
      career: string;
      zodiac: string;
      kids: string;
      zodiacUnavailable: string;
      completedAt: string;
      schemaVersion: string;
    };
  };
};

export const accountDictionaries: Record<
  SupportedLocale,
  AccountDictionary
> = {
  en: {
    dateLocale: "en",
    shared: {
      loading: "Loading account…",
      accountHome: "Go to account",
      serviceUnavailable:
        "The authentication service is temporarily unavailable.",
      retry: "Try again",
      anonymousNote:
        "InnerGeo accounts use an email address and an anonymous nickname. A real name is never required.",
      disclaimer:
        "Saving completed assessments and eligible full-report access are available for verified accounts. Community features remain planned for a future phase.",
    },
    header: {
      login: "Log in",
      loadingLabel: "Loading account",
      accountLabel: "Open account",
    },
    fields: {
      email: "Email",
      nickname: "Anonymous nickname",
      password: "Password",
      confirmPassword: "Confirm password",
      verificationToken: "Verification token",
    },
    errors: {
      invalidEmail: "Enter a valid email address.",
      invalidNickname:
        "Nickname must contain 2 to 40 characters.",
      invalidPassword:
        "Password must contain 10 to 128 characters.",
      passwordMismatch: "The passwords do not match.",
      credentials: "The email or password is incorrect.",
      emailConflict: "An account with this email already exists.",
      emailDelivery:
        "Your account was created, but email delivery is temporarily unavailable. Log in later and use Resend verification email from your account.",
      invalidToken:
        "This verification token is invalid, expired, or has already been used.",
      validation: "Check the highlighted account information.",
      unavailable: "The authentication service is temporarily unavailable.",
      generic: "The request could not be completed. Please try again.",
    },
    register: {
      eyebrow: "Anonymous account",
      title: "Create your InnerGeo account",
      description:
        "Use an email address and an anonymous nickname. You never need to provide your real name.",
      submit: "Create account",
      submitting: "Creating account…",
      haveAccount: "Already have an account?",
      login: "Log in",
      successEyebrow: "Account created",
      successTitle: "Your account is ready",
      successDescription:
        "The account has been created successfully. You can log in before email verification is complete.",
      unverified: "Your email is not verified yet.",
      emailServicePending:
        "A verification email has been sent. Open its secure link to verify your account.",
      goToLogin: "Go to login",
      goToVerification: "Go to email verification",
      developmentVerification: "Development verification link",
      alreadyAuthenticated:
        "You are already signed in. Open your account instead of creating another one.",
    },
    login: {
      eyebrow: "Account access",
      title: "Log in to InnerGeo",
      description:
        "Use the email and password associated with your anonymous account.",
      submit: "Log in",
      submitting: "Logging in…",
      noAccount: "Do not have an account?",
      register: "Create one",
      alreadyAuthenticated: "You are already signed in.",
      enterAccount: "Enter account",
      forgotPassword: "Forgot password?",
    },
    forgot: {
      eyebrow: "Account recovery",
      title: "Reset your password",
      description: "Enter your account email. If the account is eligible, InnerGeo will send a secure reset link.",
      submit: "Send reset link",
      submitting: "Sending…",
      successTitle: "Check your email",
      successDescription: "If the account is eligible, a password-reset email has been sent. The response is the same for every address.",
      backToLogin: "Back to login",
    },
    reset: {
      eyebrow: "Account recovery",
      title: "Choose a new password",
      description: "Use the one-time link from your recovery email to replace your password securely.",
      submit: "Reset password",
      submitting: "Resetting…",
      successTitle: "Password reset complete",
      successDescription: "Your password has been changed and existing account sessions have been signed out.",
      login: "Log in with new password",
    },
    verification: {
      eyebrow: "Email verification",
      title: "Verify your email",
      description:
        "Submit a one-time verification token. The token is not stored in this browser.",
      tokenFromLink:
        "A verification token was found in this link. Submit it once to verify the email.",
      manualInstruction:
        "Paste your verification token below if the link did not include one.",
      submit: "Verify email",
      submitting: "Verifying…",
      successEyebrow: "Verification complete",
      successTitle: "Email verified",
      successDescription:
        "Your email verification status has been updated successfully.",
      goToAccount: "Go to account",
    },
    ownership: {
      eyebrow: "Save this result",
      title: "Keep this assessment in your account",
      description:
        "Save this completed result to your verified anonymous account so it can be included in your future test history.",
      checkingAccount: "Checking your account…",
      loginRequired:
        "Log in before saving this assessment.",
      loginAction: "Log in to save",
      verificationRequired:
        "Verify your email before saving assessment results.",
      verificationAction: "Verify email",
      missingCredential:
        "The secure saving credential is not available in this browser. Open the result in the browser where the assessment was completed.",
      invalidCredential:
        "This result cannot be saved with the available browser credential.",
      save: "Save to my account",
      saving: "Saving…",
      retry: "Try saving again",
      savedTitle: "Saved to your account",
      savedDescription:
        "This result now belongs to your anonymous InnerGeo account. It will appear in account history when the history view is connected.",
      error:
        "The result could not be saved. Please try again.",
    },
    dashboard: {
      eyebrow: "Anonymous account",
      title: "Your InnerGeo account",
      description:
        "Review your anonymous profile and email verification status.",
      loginRequiredTitle: "Log in to view your account",
      loginRequiredDescription:
        "Account details are available after you authenticate with your email and password.",
      login: "Log in",
      register: "Create account",
      nickname: "Anonymous nickname",
      email: "Email",
      verificationStatus: "Email verification",
      createdAt: "Account created",
      verified: "Email verified",
      unverified: "Email not verified",
      unverifiedLimitation:
        "At this stage, unverified accounts cannot save results, leave community messages, or purchase reports.",
      verifyEmail: "Verify email",
      resendVerification: "Resend verification email",
      resendingVerification: "Sending…",
      resendComplete: "If the account is eligible, a new verification email has been sent.",
      logout: "Log out",
      loggingOut: "Logging out…",
      nextPhase: "Available in the next phase",
      upcomingTitle: "Account features coming next",
      upcomingDescription:
        "These areas are placeholders only. No records or purchases are being presented yet.",
      history: {
        title: "My saved assessments",
        description:
          "Review results that belong to your anonymous InnerGeo account.",
        loading: "Loading saved assessments…",
        error:
          "Saved assessment history could not be loaded.",
        retry: "Try again",
        empty: "No saved assessments yet.",
        openResult: "Open result",
        saved: "Saved",
        personality: "Personality",
        career: "Career",
        zodiac: "Zodiac",
        kids: "Kids",
        zodiacUnavailable:
          "This chart is saved, but cross-device chart retrieval will be connected in the next step.",
        completedAt: "Saved",
        schemaVersion: "Schema version",
      },
      modules: [
        {
          id: "test-history",
          title: "My test history",
          description: "Review saved Personality, Career, and Zodiac records.",
        },
        {
          id: "unlocked-reports",
          title: "Unlocked reports",
          description: "Access reports associated with future purchases.",
        },
        {
          id: "account-settings",
          title: "Account settings",
          description: "Manage profile and security preferences.",
        },
      ],
    },
  },
  zh: {
    dateLocale: "zh-CN",
    shared: {
      loading: "正在加载账户…",
      accountHome: "进入账户中心",
      serviceUnavailable: "认证服务暂时不可用。",
      retry: "重试",
      anonymousNote:
        "InnerGeo 账户只使用邮箱和匿名昵称，任何时候都不要求提供真实姓名。",
      disclaimer:
        "已验证账户现在可以保存完成的测评结果，并使用符合条件的完整报告访问功能；社区功能仍计划在后续阶段开放。",
    },
    header: {
      login: "登录",
      loadingLabel: "正在加载账户",
      accountLabel: "打开账户中心",
    },
    fields: {
      email: "邮箱",
      nickname: "匿名昵称",
      password: "密码",
      confirmPassword: "确认密码",
      verificationToken: "验证令牌",
    },
    errors: {
      invalidEmail: "请输入有效的邮箱地址。",
      invalidNickname: "昵称长度必须为 2–40 个字符。",
      invalidPassword: "密码长度必须为 10–128 个字符。",
      passwordMismatch: "两次输入的密码不一致。",
      credentials: "邮箱或密码不正确。",
      emailConflict: "该邮箱已存在账户。",
      emailDelivery:
        "账户已经创建，但邮件服务暂时不可用。请稍后登录，并在账户中心使用“重新发送验证邮件”。",
      invalidToken: "验证令牌无效、已过期或已经使用。",
      validation: "请检查填写的账户信息。",
      unavailable: "认证服务暂时不可用。",
      generic: "暂时无法完成请求，请稍后重试。",
    },
    register: {
      eyebrow: "匿名账户",
      title: "创建 InnerGeo 账户",
      description:
        "使用邮箱和匿名昵称即可注册，无需提供真实姓名。",
      submit: "创建账户",
      submitting: "正在创建账户…",
      haveAccount: "已经有账户？",
      login: "登录",
      successEyebrow: "账户已创建",
      successTitle: "你的账户已经就绪",
      successDescription:
        "账户已成功创建。邮箱验证完成前也可以登录。",
      unverified: "邮箱尚未验证。",
      emailServicePending:
        "验证邮件已发送，请打开邮件中的安全链接完成验证。",
      goToLogin: "前往登录",
      goToVerification: "前往验证邮箱",
      developmentVerification: "开发环境验证入口",
      alreadyAuthenticated:
        "你已经登录，请直接进入账户中心，无需重复注册。",
    },
    login: {
      eyebrow: "账户登录",
      title: "登录 InnerGeo",
      description: "使用匿名账户对应的邮箱和密码登录。",
      submit: "登录",
      submitting: "正在登录…",
      noAccount: "还没有账户？",
      register: "创建账户",
      alreadyAuthenticated: "你已经登录。",
      enterAccount: "进入账户中心",
      forgotPassword: "忘记密码？",
    },
    forgot: {
      eyebrow: "账户恢复",
      title: "重置密码",
      description: "输入账户邮箱。如果账户符合条件，InnerGeo 将发送安全的密码重置链接。",
      submit: "发送重置链接",
      submitting: "正在发送…",
      successTitle: "请检查邮箱",
      successDescription: "如果账户符合条件，密码重置邮件已经发送。无论邮箱是否注册，系统都会显示相同结果。",
      backToLogin: "返回登录",
    },
    reset: {
      eyebrow: "账户恢复",
      title: "设置新密码",
      description: "使用恢复邮件中的一次性链接安全地更换密码。",
      submit: "重置密码",
      submitting: "正在重置…",
      successTitle: "密码重置完成",
      successDescription: "密码已经更新，现有账户会话也已全部退出。",
      login: "使用新密码登录",
    },
    verification: {
      eyebrow: "邮箱验证",
      title: "验证你的邮箱",
      description:
        "提交一次性验证令牌。令牌不会保存在本浏览器中。",
      tokenFromLink:
        "此链接包含验证令牌。请仅提交一次以完成邮箱验证。",
      manualInstruction:
        "如果链接中没有令牌，请在下方手动粘贴。",
      submit: "验证邮箱",
      submitting: "正在验证…",
      successEyebrow: "验证完成",
      successTitle: "邮箱已验证",
      successDescription: "邮箱验证状态已成功更新。",
      goToAccount: "进入账户中心",
    },
    ownership: {
      eyebrow: "保存本次结果",
      title: "将本次测评保存到账户",
      description:
        "把已完成的测评结果保存到已验证的匿名账户，后续可纳入你的测试历史记录。",
      checkingAccount: "正在检查账户状态…",
      loginRequired: "登录后才能保存本次测评。",
      loginAction: "登录并保存",
      verificationRequired:
        "保存测评结果前，请先完成邮箱验证。",
      verificationAction: "前往验证邮箱",
      missingCredential:
        "当前浏览器中没有找到安全认领凭证。请在完成本次测评的原浏览器中打开结果并保存。",
      invalidCredential:
        "当前浏览器凭证无法保存这份测评结果。",
      save: "保存到我的账户",
      saving: "正在保存…",
      retry: "重新尝试保存",
      savedTitle: "已保存到你的账户",
      savedDescription:
        "本次结果已经归属于你的匿名 InnerGeo 账户。账户历史页面接入后，可在其中重新查看。",
      error: "暂时无法保存结果，请稍后重试。",
    },
    dashboard: {
      eyebrow: "匿名账户",
      title: "你的 InnerGeo 账户",
      description: "查看匿名资料和邮箱验证状态。",
      loginRequiredTitle: "登录后查看账户",
      loginRequiredDescription:
        "使用邮箱和密码完成认证后，即可查看账户资料。",
      login: "登录",
      register: "创建账户",
      nickname: "匿名昵称",
      email: "邮箱",
      verificationStatus: "邮箱验证状态",
      createdAt: "账户创建时间",
      verified: "邮箱已验证",
      unverified: "邮箱未验证",
      unverifiedLimitation:
        "当前阶段，未验证账户暂不能保存结果、发表社区留言或购买报告。",
      verifyEmail: "前往验证邮箱",
      resendVerification: "重新发送验证邮件",
      resendingVerification: "正在发送…",
      resendComplete: "如果账户符合条件，新的验证邮件已经发送。",
      logout: "退出登录",
      loggingOut: "正在退出…",
      nextPhase: "下一阶段开放",
      upcomingTitle: "后续账户功能",
      upcomingDescription:
        "以下区域目前只是功能预留，不展示任何虚构记录或购买数据。",
      history: {
        title: "我的已保存测评",
        description:
          "查看已经归属于你的匿名 InnerGeo 账户的测评记录。",
        loading: "正在加载已保存测评…",
        error: "暂时无法加载测评历史记录。",
        retry: "重新加载",
        empty: "目前还没有已保存的测评。",
        openResult: "打开结果",
        saved: "已保存",
        personality: "人格测试",
        career: "职业兴趣",
        zodiac: "星座星盘",
        kids: "儿童兴趣",
        zodiacUnavailable:
          "这份星盘已经保存，但跨设备读取星盘详情将在下一步接入。",
        completedAt: "保存时间",
        schemaVersion: "合同版本",
      },
      modules: [
        {
          id: "test-history",
          title: "我的测试记录",
          description: "查看已保存的 Personality、Career 和 Zodiac 记录。",
        },
        {
          id: "unlocked-reports",
          title: "已解锁报告",
          description: "访问未来购买后关联的报告。",
        },
        {
          id: "account-settings",
          title: "账户设置",
          description: "管理资料与安全偏好。",
        },
      ],
    },
  },
};

export function getAccountDictionary(
  locale: SupportedLocale,
): AccountDictionary {
  return accountDictionaries[locale];
}
