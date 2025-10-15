const Shop = () => (
  <div>
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Shop</h1>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(item => (
          <div
            key={item}
            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-full h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg mb-2"></div>
            <p className="font-medium">상품 {item}</p>
            <p className="text-sm text-gray-500">₩{item * 10000}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Shop
