import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { HiOutlineTrash } from 'react-icons/hi';

/**
 * History — Displays previous burnout analysis entries
 * Shows entries as cards with date, metrics, and delete option
 */
export default function History({ entries, onDelete }) {
  if (!entries || entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-surface-secondary rounded-2xl border border-border-default p-12 text-center"
      >
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">No Records Yet</h3>
        <p className="text-text-secondary max-w-sm mx-auto">
          Your burnout analysis history will appear here. Head to the Analyze tab to create your first entry.
        </p>
      </motion.div>
    );
  }

  // Level badge config
  const levelBadge = {
    Low: 'bg-burnout-low/10 text-burnout-low border-burnout-low/20',
    Moderate: 'bg-burnout-moderate/10 text-burnout-moderate border-burnout-moderate/20',
    High: 'bg-burnout-high/10 text-burnout-high border-burnout-high/20'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Analysis History</h3>
          <p className="text-sm text-text-secondary">{entries.length} entries recorded</p>
        </div>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <motion.div
            key={entry._id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface-elevated rounded-xl border border-border-default p-4 sm:p-5
                       hover:shadow-card transition-all duration-200 group"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Date & Level */}
              <div className="flex items-center gap-4">
                {/* Date */}
                <div className="text-center min-w-[50px]">
                  <div className="text-xs text-text-muted uppercase">
                    {format(new Date(entry.createdAt), 'MMM')}
                  </div>
                  <div className="text-2xl font-bold text-text-primary leading-tight">
                    {format(new Date(entry.createdAt), 'dd')}
                  </div>
                  <div className="text-xs text-text-muted">
                    {format(new Date(entry.createdAt), 'HH:mm')}
                  </div>
                </div>

                {/* Separator */}
                <div className="w-px h-12 bg-border-default" />

                {/* Level Badge */}
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold border ${levelBadge[entry.burnoutLevel]}`}>
                    {entry.burnoutLevel} Burnout
                  </span>
                  <div className="text-sm text-text-secondary mt-1">
                    Score: <span className="font-semibold text-text-primary">{entry.burnoutScore}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-4">
                <div className="flex gap-3 text-sm">
                  <span className="flex items-center gap-1 text-text-secondary">
                    🌙 {entry.sleepHours}h
                  </span>
                  <span className="flex items-center gap-1 text-text-secondary">
                    📚 {entry.studyHours}h
                  </span>
                  <span className="flex items-center gap-1 text-text-secondary">
                    🧘 {entry.stressLevel}/10
                  </span>
                  {entry.screenTime > 0 && (
                    <span className="flex items-center gap-1 text-text-secondary">
                      📱 {entry.screenTime}h
                    </span>
                  )}
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onDelete(entry._id)}
                  className="p-2 rounded-lg text-text-muted hover:text-burnout-high hover:bg-burnout-high/10
                             transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer border-none bg-transparent"
                  title="Delete entry"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
