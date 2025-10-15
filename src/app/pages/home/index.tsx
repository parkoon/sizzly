import { IconHeart, IconUsers } from '@tabler/icons-react'

const Dashboard = () => {
  return (
    <div className="flex-1 bg-gradient-to-b from-purple-50 to-white p-4 pb-20 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <h1 className="text-gray-600 text-center mb-4">Dashboard</h1>

        {/* 시간 범위 선택 */}
        <div className="flex justify-center gap-2 mb-6">
          <button className="px-4 py-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
            Today
          </button>
          <button className="px-4 py-1 text-sm bg-purple-100 text-purple-600 rounded-full">
            Last 7 days
          </button>
          <button className="px-4 py-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
            Last 30 days
          </button>
          <button className="px-4 py-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
            All Time
          </button>
        </div>

        {/* 차트 영역 */}
        <div className="h-48 relative mb-6 overflow-hidden rounded-xl bg-gradient-to-b from-purple-50 to-pink-50">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* 보라색 영역 */}
            <path
              d="M 0 100 Q 50 80, 100 90 T 200 85 T 300 75 T 400 70 L 400 0 L 0 0 Z"
              fill="url(#purple-gradient)"
              opacity="0.6"
            />
            {/* 분홍색 영역 */}
            <path
              d="M 0 140 Q 50 130, 100 135 T 200 125 T 300 120 T 400 115 L 400 200 L 0 200 Z"
              fill="url(#pink-gradient)"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
              <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f9a8d4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute bottom-4 left-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-xs text-gray-600">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
              <span className="text-xs text-gray-600">Likes</span>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <IconUsers className="w-4 h-4 text-gray-400" />
              <span className="text-2xl font-semibold text-gray-800">3,890</span>
            </div>
            <p className="text-xs text-gray-500">Followers Gained</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <IconUsers className="w-4 h-4 text-gray-400" />
              <span className="text-2xl font-semibold text-gray-800">1,044</span>
            </div>
            <p className="text-xs text-gray-500">Followers Lost</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <IconHeart className="w-4 h-4 text-gray-400" />
              <span className="text-2xl font-semibold text-gray-800">845</span>
            </div>
            <p className="text-xs text-gray-500">Likes Received</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-semibold text-gray-800">390</span>
            </div>
            <p className="text-xs text-gray-500">Comments Received</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-semibold text-gray-800">12</span>
            </div>
            <p className="text-xs text-gray-500">Average Impressions</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-semibold text-gray-800">3,500</span>
            </div>
            <p className="text-xs text-gray-500">Profile Views</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
