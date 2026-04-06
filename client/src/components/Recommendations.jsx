import { motion } from 'framer-motion';

/**
 * Recommendations — Displays AI-like recommendations based on burnout analysis
 * Shows categorized cards with priority indicators and a typewriter-style appearance
 */
export default function Recommendations({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  // Priority to color mapping
  const priorityConfig = {
    high: { bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500' },
    medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
    low: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🤖</span>
        <h3 className="text-lg font-bold text-text-primary">Smart Recommendations</h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const config = priorityConfig[rec.priority] || priorityConfig.medium;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`bg-surface-elevated rounded-xl border ${config.border} p-5 hover:shadow-card transition-shadow duration-300`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center text-xl flex-shrink-0`}>
                  {rec.icon}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="text-sm font-semibold text-text-primary">{rec.title}</h4>
                    <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                    <span className="text-xs text-text-muted capitalize">{rec.priority}</span>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-text-secondary leading-relaxed">{rec.message}</p>

                  {/* Category tag */}
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-surface-secondary text-xs text-text-muted font-medium">
                    {rec.category}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
