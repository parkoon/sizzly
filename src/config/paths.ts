export const paths = {
  home: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    profile: {
      path: '/profile',
      getHref: () => '/profile',
    },
    likes: {
      path: '/likes',
      getHref: () => '/likes',
    },
    shop: {
      path: '/shop',
      getHref: () => '/shop',
    },
    data: {
      path: '/data',
      getHref: () => '/data',
    },
  },
  watch: {
    path: '/watch/:videoId',
    getHref: (videoId: string) => `/watch/${videoId}`,
  },
  my: {
    sentences: {
      path: '/my/sentences',
      getHref: () => '/my/sentences',
    },
  },
  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },
} as const
