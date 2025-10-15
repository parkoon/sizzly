import {
  IconChartArcs,
  IconDatabase,
  IconHeart,
  IconShoppingBag,
  IconUsers,
} from '@tabler/icons-react'
import { type FC } from 'react'
import { NavLink, Outlet } from 'react-router'

import { paths } from '@/config/paths'

type TabItem = {
  id: string
  label: string
  icon: FC<{ className?: string }>
  path: string
}

const TAB_ITEMS: TabItem[] = [
  {
    id: 'stats',
    label: 'Stats',
    icon: IconChartArcs,
    path: paths.home.root.getHref(),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: IconUsers,
    path: paths.home.profile.getHref(),
  },
  {
    id: 'likes',
    label: 'Likes',
    icon: IconHeart,
    path: paths.home.likes.getHref(),
  },
  {
    id: 'shop',
    label: 'Shop',
    icon: IconShoppingBag,
    path: paths.home.shop.getHref(),
  },
  {
    id: 'data',
    label: 'Data',
    icon: IconDatabase,
    path: paths.home.data.getHref(),
  },
]

const TabLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 pb-20 tab-in">
        <Outlet />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16 px-4">
          {TAB_ITEMS.map(tab => {
            const Icon = tab.icon
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                    isActive ? 'text-purple-600 scale-105' : 'text-gray-400 hover:text-gray-600'
                  }`
                }
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{tab.label}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TabLayout
