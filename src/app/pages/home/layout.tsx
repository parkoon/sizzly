import {
  IconChartArcs,
  IconDatabase,
  IconHeart,
  IconShoppingBag,
  IconUsers,
} from '@tabler/icons-react'
import { NavLink, Outlet } from 'react-router'

import { paths } from '@/config/paths'

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      {/* 라우트별 콘텐츠 영역 */}
      <Outlet />
      {/* 고정된 하단 탭 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16 px-4">
          <NavLink
            to={paths.home.root.getHref()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                isActive ? 'text-purple-600 scale-105' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <IconChartArcs className="w-6 h-6" />
            <span className="text-xs mt-1">Stats</span>
          </NavLink>

          <NavLink
            to={paths.home.profile.getHref()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                isActive ? 'text-purple-600 scale-105' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <IconUsers className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </NavLink>

          <NavLink
            to={paths.home.likes.getHref()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                isActive ? 'text-purple-600 scale-105' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <IconHeart className="w-6 h-6" />
            <span className="text-xs mt-1">Likes</span>
          </NavLink>

          <NavLink
            to={paths.home.shop.getHref()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                isActive ? 'text-purple-600 scale-105' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <IconShoppingBag className="w-6 h-6" />
            <span className="text-xs mt-1">Shop</span>
          </NavLink>

          <NavLink
            to={paths.home.data.getHref()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                isActive ? 'text-purple-600 scale-105' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <IconDatabase className="w-6 h-6" />
            <span className="text-xs mt-1">Data</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
