const Data = () => (
  <div className="flex-1 bg-gradient-to-b from-indigo-50 to-white p-4 pb-20 animate-fadeIn">
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Data Analytics</h1>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-2">월간 성장률</p>
          <div className="text-2xl font-bold text-green-600">+23.5%</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-2">평균 참여율</p>
          <div className="text-2xl font-bold text-blue-600">4.8%</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
          <p className="text-sm text-gray-600 mb-2">총 도달 수</p>
          <div className="text-2xl font-bold text-purple-600">125.3K</div>
        </div>
      </div>
    </div>
  </div>
)

export default Data
