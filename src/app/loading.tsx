/**
 * Root Loading Component
 * Displays while pages are loading
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Loading your adventure...
        </h2>
        <p className="text-gray-600">Just a moment</p>
      </div>
    </div>
  );
}
