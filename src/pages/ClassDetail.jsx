import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Volume2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle,
  XCircle,
  BookOpen,
  Target
} from 'lucide-react'
import { mathClassDetail, markedPointExercises } from '../data/mockData'

const tabs = [
  { id: 'notes', label: '学习笔记', emoji: '📝' },
  { id: 'review', label: '查漏补缺', emoji: '🎯' },
]

function ClassDetail({ classData, onBack }) {
  const [activeTab, setActiveTab] = useState('notes')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [expandedPoints, setExpandedPoints] = useState({})
  const [answeredQuestions, setAnsweredQuestions] = useState({})
  
  const detail = mathClassDetail
  const totalSeconds = detail.durationSeconds

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId, answerIndex) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const togglePoint = (pointId) => {
    setExpandedPoints(prev => ({
      ...prev,
      [pointId]: !prev[pointId]
    }))
  }

  // 学科样式
  const subjectStyles = {
    '数学': { bg: 'from-sky-400 to-sky-500', emoji: '🔢' },
    '物理': { bg: 'from-lavender-400 to-lavender-500', emoji: '🔬' },
    '英语': { bg: 'from-mint-400 to-mint-500', emoji: '🌍' },
    '化学': { bg: 'from-peach-400 to-peach-500', emoji: '🧪' },
  }
  const style = subjectStyles[classData.subject] || { bg: 'from-pink-400 to-pink-500', emoji: '📚' }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b-4 border-pink-100">
        <div className="p-4 lg:p-6">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              className="p-3 rounded-2xl bg-pink-100 hover:bg-pink-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-6 h-6 text-pink-600" />
            </motion.button>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${style.bg} text-white font-bold`}>
                  {style.emoji} {classData.subject}
                </span>
                <span className="text-sm text-gray-400">{classData.date}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{classData.topic}</h1>
              <p className="text-sm text-gray-500">{classData.teacher} · {classData.duration}</p>
            </div>
            
            {/* 标记点数量 - 突出显示 */}
            {classData.markedPoints > 0 && (
              <motion.div 
                className="sticker"
                animate={{ rotate: [-2, 2, -2], y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bookmark className="w-4 h-4" />
                <span>{classData.markedPoints} 个不懂</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Audio Player - 可爱风格 */}
        <div className="px-4 lg:px-6 pb-4">
          <div className="cute-card p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="relative h-4 bg-pink-100 rounded-full overflow-visible">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-400 to-peach-400 rounded-full"
                  style={{ width: `${(currentTime / totalSeconds) * 100}%` }}
                />
                {/* Marked Points - 大标记点 */}
                {markedPointExercises.map((point, index) => {
                  const timeInSeconds = point.markedTime.split(':').reduce((acc, time) => (60 * acc) + parseInt(time), 0)
                  const position = (timeInSeconds / totalSeconds) * 100
                  return (
                    <motion.div 
                      key={index}
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-pink-500 to-red-400 rounded-full cursor-pointer flex items-center justify-center text-xs text-white font-bold shadow-lg marker-pulse"
                      style={{ left: `${position}%`, marginLeft: '-12px' }}
                      title={point.markedReason}
                      whileHover={{ scale: 1.3 }}
                    >
                      📌
                    </motion.div>
                  )
                })}
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{detail.duration}</span>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <motion.button 
                className="p-3 text-gray-400 hover:text-pink-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipBack className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-peach-400 flex items-center justify-center text-white shadow-cute-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </motion.button>
              
              <motion.button 
                className="p-3 text-gray-400 hover:text-pink-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward className="w-6 h-6" />
              </motion.button>
              
              <div className="flex items-center gap-2 ml-4">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <div className="w-20 h-2 bg-pink-100 rounded-full">
                  <div className="w-3/4 h-full bg-gradient-to-r from-pink-400 to-peach-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - 只有两个标签 */}
        <div className="px-4 lg:px-6 pb-3">
          <div className="flex gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-pink-400 to-peach-400 text-white shadow-cute' 
                      : 'bg-white text-gray-500 hover:bg-pink-50 hover:text-pink-500 border-2 border-pink-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{tab.emoji}</span>
                  <span>{tab.label}</span>
                  {tab.id === 'review' && classData.markedPoints > 0 && (
                    <span className={`ml-1 px-2 py-0.5 text-sm rounded-full font-bold ${
                      isActive ? 'bg-white/30 text-white' : 'bg-pink-100 text-pink-500'
                    }`}>
                      {classData.markedPoints}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 lg:px-6 mt-4">
        <AnimatePresence mode="wait">
          {activeTab === 'notes' && (
            <NotesView key="notes" notes={detail.notes} />
          )}
          {activeTab === 'review' && (
            <ReviewView 
              key="review" 
              markedPoints={markedPointExercises}
              transcript={detail.transcript}
              expandedPoints={expandedPoints}
              togglePoint={togglePoint}
              answeredQuestions={answeredQuestions}
              handleAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function NotesView({ notes }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Key Points */}
      <section className="cute-card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          重要知识点
        </h3>
        <div className="grid gap-3">
          {notes.keyPoints.map((point, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-2xl ${
                point.importance === 'high' 
                  ? 'bg-gradient-to-r from-pink-50 to-peach-50 border-2 border-pink-200' 
                  : 'bg-gray-50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                {point.importance === 'high' && (
                  <span className="shrink-0 text-sm px-3 py-1 rounded-full bg-gradient-to-r from-pink-400 to-peach-400 text-white font-bold">
                    重点 ⭐
                  </span>
                )}
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{point.title}</h4>
                  <p className="text-gray-600">{point.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Formulas */}
      <section className="cute-card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📐</span>
          重要公式
        </h3>
        <div className="grid gap-2">
          {notes.formulas.map((formula, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 rounded-2xl bg-sky-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 text-white text-sm flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <code className="text-base text-gray-700 font-mono">{formula}</code>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className="cute-card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          今日小结
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">{notes.summary}</p>
      </section>
    </motion.div>
  )
}

function ReviewView({ markedPoints, transcript, expandedPoints, togglePoint, answeredQuestions, handleAnswer }) {
  // 找到标记时间点附近的转录内容
  const getRelatedTranscript = (markedTime) => {
    const timeInSeconds = markedTime.split(':').reduce((acc, time) => (60 * acc) + parseInt(time), 0)
    return transcript.filter(seg => {
      return seg.startTime >= timeInSeconds - 60 && seg.startTime <= timeInSeconds + 120
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* 提示卡片 */}
      <motion.div 
        className="cute-card-accent p-5"
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">🎯</span>
          <div>
            <h3 className="text-lg font-bold text-gray-800">这里是你标记"不太懂"的地方</h3>
            <p className="text-gray-500">老师帮你重新讲一遍，然后做几道练习巩固一下吧～</p>
          </div>
        </div>
      </motion.div>

      {/* Marked Points with Explanation and Exercises */}
      <div className="space-y-4">
        {markedPoints.map((point, index) => {
          const isExpanded = expandedPoints[point.id]
          const relatedContent = getRelatedTranscript(point.markedTime)
          
          return (
            <motion.div
              key={point.id}
              className="cute-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Point Header */}
              <div 
                className="p-5 cursor-pointer hover:bg-pink-50 transition-colors"
                onClick={() => togglePoint(point.id)}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-3xl text-white shadow-cute"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📌
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono px-3 py-1 rounded-xl bg-pink-100 text-pink-600 font-bold">
                        ⏰ {point.markedTime}
                      </span>
                      <span className="text-xs text-pink-500 font-medium">我不太懂这里</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg">{point.markedReason}</h4>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-pink-400"
                  >
                    <ChevronDown className="w-8 h-8" />
                  </motion.div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t-2 border-dashed border-pink-100"
                  >
                    {/* 知识点讲解 */}
                    <div className="p-5 bg-gradient-to-b from-sky-50 to-white">
                      <h5 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-xl">👨‍🏫</span>
                        老师再讲一遍
                      </h5>
                      
                      {/* 核心概念卡片 */}
                      <div className="bg-white rounded-2xl p-4 border-2 border-sky-200 mb-4">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">💡</span>
                          <div>
                            <p className="font-bold text-sky-700 mb-2">核心概念</p>
                            <p className="text-gray-700 leading-relaxed">{point.relatedContent}</p>
                          </div>
                        </div>
                      </div>

                      {/* 相关课堂内容 */}
                      <div className="space-y-3">
                        {relatedContent.slice(0, 2).map((seg, idx) => (
                          <div key={idx} className="bg-white/70 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <span className="text-sm font-mono px-2 py-1 rounded-lg bg-sky-100 text-sky-600 shrink-0">
                                {seg.timeLabel}
                              </span>
                              <p className="text-gray-600 text-sm leading-relaxed">{seg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 练习题 */}
                    <div className="p-5 bg-gradient-to-b from-pink-50 to-white">
                      <h5 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-xl">✏️</span>
                        做几道题试试
                      </h5>
                      
                      <div className="space-y-4">
                        {point.exercises.map((exercise, eIndex) => (
                          <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            index={eIndex}
                            answered={answeredQuestions[exercise.id]}
                            onAnswer={(answer) => handleAnswer(exercise.id, answer)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* 完成提示 */}
      <motion.div 
        className="cute-card p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-5xl mb-3">🌈</div>
        <p className="text-lg font-bold text-gray-700">把不懂的地方都弄懂，你就更棒啦！</p>
        <p className="text-gray-500 text-sm mt-1">点击每个标记展开学习内容 ↑</p>
      </motion.div>
    </motion.div>
  )
}

function ExerciseCard({ exercise, index, answered, onAnswer }) {
  const isCorrect = answered === exercise.answer
  const hasAnswered = answered !== undefined

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'easy': return { bg: 'bg-mint-100', text: 'text-mint-600', label: '简单 😊' }
      case 'medium': return { bg: 'bg-sunny-100', text: 'text-sunny-600', label: '中等 🤔' }
      case 'hard': return { bg: 'bg-pink-100', text: 'text-pink-600', label: '挑战 💪' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', label: difficulty }
    }
  }

  const diffStyle = getDifficultyStyle(exercise.difficulty)

  return (
    <motion.div
      className="bg-white rounded-2xl p-5 border-2 border-pink-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-peach-400 text-white text-sm flex items-center justify-center font-bold">
          {index + 1}
        </span>
        <span className={`text-sm px-3 py-1 rounded-full ${diffStyle.bg} ${diffStyle.text} font-bold`}>
          {diffStyle.label}
        </span>
      </div>

      <p className="text-lg text-gray-800 font-medium mb-4">{exercise.question}</p>

      {exercise.type === 'choice' && (
        <div className="grid gap-3">
          {exercise.options.map((option, oIndex) => {
            const isSelected = answered === oIndex
            const isRightAnswer = oIndex === exercise.answer
            
            let optionClass = 'bg-gray-50 hover:bg-pink-50 text-gray-700 border-2 border-gray-100'
            if (hasAnswered) {
              if (isRightAnswer) {
                optionClass = 'bg-mint-100 text-mint-700 border-2 border-mint-300 correct-answer'
              } else if (isSelected && !isCorrect) {
                optionClass = 'bg-pink-100 text-pink-700 border-2 border-pink-300 wrong-answer'
              }
            }

            return (
              <motion.button
                key={oIndex}
                onClick={() => !hasAnswered && onAnswer(oIndex)}
                className={`flex items-center gap-3 p-4 rounded-2xl text-left transition-all font-medium ${optionClass}`}
                whileHover={!hasAnswered ? { scale: 1.02, x: 5 } : {}}
                whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                disabled={hasAnswered}
              >
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-bold shadow-sm">
                  {String.fromCharCode(65 + oIndex)}
                </span>
                <span className="flex-1 text-base">{option}</span>
                {hasAnswered && isRightAnswer && <span className="text-2xl">✓</span>}
                {hasAnswered && isSelected && !isCorrect && <span className="text-2xl">✗</span>}
              </motion.button>
            )
          })}
        </div>
      )}

      {/* Explanation */}
      <AnimatePresence>
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t-2 border-dashed border-gray-100"
          >
            <div className={`p-4 rounded-2xl ${isCorrect ? 'bg-mint-50' : 'bg-sunny-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <span className="text-2xl">🎉</span>
                    <span className="font-bold text-mint-600">太棒了，答对啦！</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">💡</span>
                    <span className="font-bold text-sunny-600">没关系，看看解析～</span>
                  </>
                )}
              </div>
              <p className="text-gray-700">{exercise.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ClassDetail
