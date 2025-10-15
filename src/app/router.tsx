import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { paths } from '@/config/paths'
import { convert } from '@/lib/route'

// eslint-disable-next-line react-refresh/only-export-components
export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.root.path,
      lazy: () => import('../components/layouts/tab-layout').then(convert(queryClient)),
      children: [
        {
          index: true,
          lazy: () => import('./pages/home').then(convert(queryClient)),
        },
        {
          path: paths.home.bookmarks.path,
          lazy: () => import('./pages/home/bookmarks').then(convert(queryClient)),
        },
      ],
    },
    {
      path: paths.watch.path,
      lazy: () => import('./pages/watch').then(convert(queryClient)),
    },
    {
      path: paths.my.sentences.path,
      lazy: () => import('./pages/my/sentences').then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import('./pages/auth/login').then(convert(queryClient)),
    },

    {
      path: '*',
      lazy: () => import('./pages/not-found').then(convert(queryClient)),
    },
  ])

export const AppRouter = () => {
  const queryClient = useQueryClient()

  const router = useMemo(() => createAppRouter(queryClient), [queryClient])

  return <RouterProvider router={router} />
}
