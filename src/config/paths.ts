export const paths = {
  home: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    bookmarks: {
      path: '/bookmarks',
      getHref: () => '/bookmarks',
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
