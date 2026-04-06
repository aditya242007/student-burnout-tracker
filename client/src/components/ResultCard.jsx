import { motion } from 'framer-motion';

/**
 * ResultCard — Displays burnout analysis result
 * Shows score, level, and a circular gauge visualization
 */
export default function ResultCard({ result }) {
  if (!result?.entry) return null;

  const { burnoutScore, burnoutLevel, sleepHours, studyHours, stressLevel, screenTime } = result.entry;

  // Color mapping for burnout levels
  const levelConfig = {
    Low: {
      color: 'text-burnout-low',
      bg: 'bg-burnout-low/10',
      border: 'border-burnout-low/30',
      gradient: 'from-emerald-400 to-green-500',
      emoji: '😊',
      message: 'You\'re doing great! Keep up the healthy habits.'
    },
    Moderate: {
      color: 'text-burnout-moderate',
      bg: 'bg-burnout-moderate/10',
      border: 'border-burnout-moderate/30',
      gradient: 'from-amber-400 to-yellow-500',
      emoji: '😐',
      message: 'Watch out — you\'re approaching burnout territory.'
    },
    High: {
      color: 'text-burnout-high',
      bg: 'bg-burnout-high/10',
      border: 'border-burnout-high/30',
      gradient: 'from-red-400 to-rose-500',
      emoji: '😰',
      message: 'Your burnout risk is high. Take action now!'
    }
  };

  const config = levelConfig[burnoutLevel];

  // Calculate gauge percentage (max score ~40 for visualization)
  const percentage = Math.min(100, (burnoutScore / 40) * 100);
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const metrics = [
    { label: 'Sleep', value: `${sleepHours}h`, icon: '🌙' },
    { label: 'Study', value: `${studyHours}h`, icon: '📚' },
    { label: 'Stress', value: `${stressLevel}/10`, icon: '🧘' },
    { label: 'Screen', value: `${screenTime || 0}h`, icon: '📱' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`bg-surface-elevated rounded-2xl border ${config.border} shadow-card overflow-hidden`}
    >
      {/* Header gradient bar */}
      <div className={`h-1.5 bg-gradient-to-r ${config.gradient}`} />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Circular Gauge */}
          <div className="relative flex-shrink-0">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-surface-tertiary"
              />
              {/* Progress circle */}
              <motion.circle
                cx="60" cy="60" r="54"
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                className={config.color}
                stroke="currentColor"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            {/* Score in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className={`text-3xl font-bold ${config.color}`}
              >
                {burnoutScore}
              </motion.span>
              <span className="text-xs text-text-muted mt-0.5">Score</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
              <span className="text-3xl">{config.emoji}</span>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.color}`}>
                  {burnoutLevel} Burnout
                </span>
              </div>
            </div>
            <p className="text-text-secondary mt-2">{config.message}</p>

            {/* Quick metrics */}
            <div className="grid grid-cols-4 gap-3 mt-5">
              {metrics.map(metric => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center bg-surface-secondary rounded-xl p-2.5"
                >
                  <div className="text-lg mb-0.5">{metric.icon}</div>
                  <div className="text-sm font-semibold text-text-primary">{metric.value}</div>
                  <div className="text-xs text-text-muted">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
