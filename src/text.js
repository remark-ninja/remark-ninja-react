const textMap = {
  submit: {
    'en-US': 'Submit',
    'zh-CN': '提交'
  },
  submitted: {
    'en-US': 'Submitted',
    'zh-CN': '提交成功'
  },
  name: {
    'en-US': 'Name',
    'zh-CN': '昵称'
  },
  name_placeholder: {
    'en-US': 'Optional. "Guest" by default.',
    'zh-CN': '可选，默认为「访客」。'
  },
  email: {
    'en-US': 'Email',
    'zh-CN': '电子邮箱'
  },
  email_placeholder: {
    'en-US': 'Optional. Used to generate avatar. Hidden from public.',
    'zh-CN': '可选，用于生成头像，不会公开展示。'
  },
  comment: {
    'en-US': 'Comment',
    'zh-CN': '评论'
  },
  guest: {
    'en-US': 'Guest',
    'zh-CN': '访客'
  },
  powered_by: {
    'en-US': 'Comments powered by',
    'zh-CN': '评论系统提供：'
  },
  loading_comments: {
    'en-US': 'Loading comments ...',
    'zh-CN': '正在加载评论 ...'
  },
  prev_page: {
    'en-US': 'Previous',
    'zh-CN': '上一页'
  },
  next_page: {
    'en-US': 'Next',
    'zh-CN': '下一页'
  }
};

const text = key => {
  let lang = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  if (lang !== 'zh-CN') {
    // Only support simplified Chinese and English for now.
    lang = 'en-US';
  }
  return textMap[key][lang];
};

export default text;
