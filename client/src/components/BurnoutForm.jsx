import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * BurnoutForm — Input form for daily lifestyle metrics
 * Fields: Sleep Hours, Study Hours, Stress Level (slider), Screen Time (optional)
 */
export default function BurnoutForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    sleepHours: 7,
    studyHours: 4,
    stressLevel: 5,
    screenTime: 3
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Get stress level color based on value
  const getStressColor = (level) => {
    if (level <= 3) return 'text-burnout-low';
    if (level <= 6) return 'text-burnout-moderate';
    return 'text-burnout-high';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-surface-elevated rounded-2xl border border-border-default shadow-card p-6 sm:p-8 space-y-6"
      >
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">Daily Check-in</h2>
          <p className="text-sm text-text-secondary">Enter your metrics for today</p>
        </div>

        {/* Sleep Hours */}
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              🌙 Sleep Hours
            </span>
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md">
              {formData.sleepHours}h
            </span>
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={formData.sleepHours}
            onChange={(e) => handleChange('sleepHours', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default
                       text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500
                       transition-all duration-200 text-base"
            required
          />
        </div>

        {/* Study Hours */}
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              📚 Study Hours
            </span>
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md">
              {formData.studyHours}h
            </span>
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={formData.studyHours}
            onChange={(e) => handleChange('studyHours', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default
                       text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500
                       transition-all duration-200 text-base"
            required
          />
        </div>

        {/* Stress Level Slider */}
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              🧘 Stress Level
            </span>
            <span className={`text-lg font-bold ${getStressColor(formData.stressLevel)}`}>
              {formData.stressLevel}/10
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.stressLevel}
            onChange={(e) => handleChange('stressLevel', e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-text-muted">
            <span>Relaxed</span>
            <span>Stressed</span>
            <span>Overwhelmed</span>
          </div>
        </div>

        {/* Screen Time */}
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              📱 Screen Time <span className="text-text-muted text-xs">(optional)</span>
            </span>
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md">
              {formData.screenTime}h
            </span>
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={formData.screenTime}
            onChange={(e) => handleChange('screenTime', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default
                       text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500
                       transition-all duration-200 text-base"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl gradient-bg text-white font-semibold text-base
                     shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-none
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Burnout Level'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
