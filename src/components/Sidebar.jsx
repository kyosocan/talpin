import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

function Sidebar({ currentView, onNavigate }) {
  const isActive = currentView === 'dashboard' || currentView === 'detail'
  
  return (
    <aside className="w-24 lg:w-72 h-screen sticky top-0 bg-white/80 backdrop-blur-lg flex flex-col py-6 z-20 border-r-4 border-pink-200">
      {/* Logo - 可爱风格 */}
      <div className="px-4 lg:px-6 mb-8">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-peach-400 flex items-center justify-center shadow-cute text-2xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ 
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            🎒
          </motion.div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold gradient-text-cute">小学霸</h1>
            <p className="text-xs text-pink-400">学习好帮手 ✨</p>
          </div>
        </div>
      </div>

      {/* Navigation - 只有今日学习 */}
      <nav className="flex-1 px-3 lg:px-4">
        <motion.button
          onClick={() => onNavigate('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200 ${
            isActive 
              ? 'bg-gradient-to-r from-pink-100 to-peach-100 text-pink-600 shadow-cute' 
              : 'text-gray-500 hover:bg-pink-50 hover:text-pink-500'
          }`}
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-2xl emoji-bounce">📚</span>
          <span className="hidden lg:block font-bold text-lg">今日学习</span>
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="hidden lg:block ml-auto text-lg"
            >
              ⭐
            </motion.div>
          )}
        </motion.button>
      </nav>

      {/* 可爱的装饰 */}
      <div className="hidden lg:block px-4 mt-4">
        <motion.div 
          className="bg-gradient-to-br from-sunny-100 to-pink-100 rounded-2xl p-4 text-center"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-4xl mb-2">🌟</div>
          <p className="text-sm text-pink-600 font-medium">加油学习！</p>
          <p className="text-xs text-gray-500">你是最棒的！</p>
        </motion.div>
      </div>

      {/* User Profile - 可爱版 */}
      <div className="px-3 lg:px-4 mt-4 pt-4 border-t-2 border-pink-100">
        <motion.div 
          className="flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-pink-50 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-lavender-400 flex items-center justify-center text-2xl shadow-cute">
            😊
          </div>
          <div className="hidden lg:block">
            <p className="text-base font-bold text-gray-700">小明同学</p>
            <p className="text-xs text-pink-400">三年级(2)班 🏫</p>
          </div>
        </motion.div>
      </div>
    </aside>
  )
}

export default Sidebar
