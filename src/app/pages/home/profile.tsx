const Profile = () => (
  <div className="flex-1 bg-gradient-to-b from-blue-50 to-white p-4 pb-20 animate-fadeIn">
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
        <div>
          <h2 className="text-xl font-semibold">사용자님</h2>
          <p className="text-gray-500">@username</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600">Email</p>
          <p className="font-medium">user@example.com</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600">가입일</p>
          <p className="font-medium">2024년 1월 1일</p>
        </div>
      </div>
    </div>
  </div>
)

export default Profile
