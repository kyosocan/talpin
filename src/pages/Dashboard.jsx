import { motion } from 'framer-motion'
import { 
  ChevronRight,
  Bookmark,
  CheckCircle2,
  Loader2
} from 'lucide-react'
import { classRecordings, learningStats } from '../data/mockData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function Dashboard({ onClassSelect }) {
  const todayRecordings = classRecordings.filter(r => r.date === '2024-12-18')
  
  return (
    <motion.div 
      className="p-6 lg:p-8 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 浮动装饰 */}
      <div className="fixed top-20 right-20 text-6xl opacity-20 pointer-events-none animate-float">🌈</div>
      <div className="fixed bottom-40 right-40 text-5xl opacity-20 pointer-events-none animate-float" style={{animationDelay: '1s'}}>⭐</div>
      <div className="fixed top-40 left-1/3 text-4xl opacity-20 pointer-events-none animate-float" style={{animationDelay: '2s'}}>☁️</div>

      {/* Header - 可爱欢迎 */}
      <motion.header className="mb-8" variants={itemVariants}>
        <div className="cute-card p-6 lg:p-8">
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-6xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👋
            </motion.div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                你好呀，小明！
              </h1>
              <p className="text-lg text-gray-500">
                今天是 12月18日 星期三 ☀️ 
                <span className="ml-2 inline-flex items-center gap-1 bg-mint-100 text-mint-600 px-3 py-1 rounded-full text-sm font-bold">
                  已完成 {learningStats.completedClasses}/{learningStats.totalClasses} 节课 ✓
                </span>
              </p>
            </div>
          </div>
          
          {/* Pin 设备状态 */}
          <motion.div 
            className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-peach-100 px-4 py-2 rounded-full"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-3 h-3 rounded-full bg-mint-400 animate-pulse" />
            <span className="text-sm font-medium text-pink-600">🎤 小录音笔已连接</span>
          </motion.div>
        </div>
      </motion.header>

      {/* Stats Cards - 简化统计 */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        variants={itemVariants}
      >
        <StatCard 
          emoji="⏰" 
          label="学习时间" 
          value={learningStats.todayStudyTime}
          bgColor="from-sky-100 to-sky-200"
          textColor="text-sky-600"
        />
        <StatCard 
          emoji="📝" 
          label="课堂笔记" 
          value={`${learningStats.completedClasses} 份`}
          bgColor="from-lavender-100 to-lavender-200"
          textColor="text-lavender-600"
        />
        <StatCard 
          emoji="🎯" 
          label="待复习" 
          value={`${learningStats.markedPoints} 处`}
          bgColor="from-pink-100 to-peach-100"
          textColor="text-pink-600"
          highlight
        />
      </motion.div>

      {/* Today's Classes - 今日课堂 */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">📚</span>
            今日课堂
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {todayRecordings.map((recording, index) => (
            <ClassCard 
              key={recording.id} 
              recording={recording} 
              index={index}
              onClick={() => onClassSelect(recording)}
            />
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}

function StatCard({ emoji, label, value, bgColor, textColor, highlight }) {
  return (
    <motion.div 
      className={`cute-card p-5 card-bounce ${highlight ? 'ring-4 ring-pink-300 ring-opacity-50' : ''}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bgColor} flex items-center justify-center mb-3 text-3xl`}>
        {emoji}
      </div>
      <p className={`text-2xl font-bold ${textColor} mb-1`}>{value}</p>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </motion.div>
  )
}

function ClassCard({ recording, index, onClick }) {
  const isProcessing = recording.status === 'processing'
  
  // 可爱的学科颜色
  const subjectStyles = {
    '数学': { bg: 'from-sky-400 to-sky-500', emoji: '🔢' },
    '物理': { bg: 'from-lavender-400 to-lavender-500', emoji: '🔬' },
    '英语': { bg: 'from-mint-400 to-mint-500', emoji: '🌍' },
    '化学': { bg: 'from-peach-400 to-peach-500', emoji: '🧪' },
    '语文': { bg: 'from-pink-400 to-pink-500', emoji: '📖' },
  }

  const style = subjectStyles[recording.subject] || { bg: 'from-gray-400 to-gray-500', emoji: '📚' }
  
  return (
    <motion.div
      className="cute-card p-5 cursor-pointer card-bounce"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start gap-4">
        {/* Subject Icon */}
        <motion.div 
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${style.bg} flex items-center justify-center text-3xl shadow-lg shrink-0`}
          whileHover={{ rotate: [0, -5, 5, 0] }}
        >
          {style.emoji}
        </motion.div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${style.bg} text-white font-bold`}>
              {recording.subject}
            </span>
            {isProcessing ? (
              <span className="text-xs text-sunny-500 flex items-center gap-1 font-medium">
                <Loader2 className="w-3 h-3 animate-spin" />
                整理中...
              </span>
            ) : (
              <span className="text-xs text-mint-500 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                已完成
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 truncate mb-1">
            {recording.topic}
          </h3>
          
          <p className="text-sm text-gray-500 mb-3">
            {recording.teacher} · {recording.time} · {recording.duration}
          </p>
          
          {/* Marked Points - 突出显示 */}
          {recording.markedPoints > 0 && (
            <motion.div 
              className="sticker"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bookmark className="w-4 h-4" />
              <span>{recording.markedPoints} 处不懂</span>
            </motion.div>
          )}
        </div>
        
        {/* Arrow */}
        <motion.div
          className="text-pink-400"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.div>
      </div>
      
      {/* Summary Preview */}
      {!isProcessing && (
        <div className="mt-4 pt-4 border-t-2 border-dashed border-pink-100">
          <p className="text-sm text-gray-500 line-clamp-2">
            💡 {recording.summary}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default Dashboard
