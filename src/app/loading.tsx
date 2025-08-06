export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <span className="text-white font-bold text-xl">DM</span>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          {/* Wave Animation */}
          <div className="flex justify-center space-x-1 mb-6">
            <div className="w-3 h-12 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-8 bg-blue-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-16 bg-blue-600 rounded-full animate-pulse delay-200"></div>
            <div className="w-3 h-6 bg-blue-500 rounded-full animate-pulse delay-300"></div>
            <div className="w-3 h-10 bg-blue-400 rounded-full animate-pulse delay-400"></div>
          </div>

          {/* Spinning Circle */}
          <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          다이빙 메이트
        </h2>
        <p className="text-gray-600 animate-pulse">
          완벽한 다이빙 경험을 준비하고 있습니다...
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
