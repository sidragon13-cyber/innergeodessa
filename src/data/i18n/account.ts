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
        "Account access does not change assessment results or unlock paid features. Saving, community, and purchasing capabilities will be introduced separately.",
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
        "Formal verification email delivery is not connected yet. Do not assume that an email has been sent.",
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
      logout: "Log out",
      loggingOut: "Logging out…",
      nextPhase: "Available in the next phase",
      upcomingTitle: "Account features coming next",
      upcomingDescription:
        "These areas are placeholders only. No records or purchases are being presented yet.",
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
        "账户登录不会改变测评结果，也不会自动解锁付费功能。保存、社区和购买能力将在后续阶段分别接入。",
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
        "正式验证邮件服务尚未接入，请不要假定验证邮件已经发送。",
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
      logout: "退出登录",
      loggingOut: "正在退出…",
      nextPhase: "下一阶段开放",
      upcomingTitle: "后续账户功能",
      upcomingDescription:
        "以下区域目前只是功能预留，不展示任何虚构记录或购买数据。",
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
