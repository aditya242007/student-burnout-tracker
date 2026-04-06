import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
  LineChart, Line, Area, AreaChart
} from 'recharts';

/**
 * Charts — Data visualization component using Recharts
 * Includes: Bar chart (current metrics), Pie chart (distribution), Line chart (progress)
 */
export default function Charts({ stats, entries, currentEntry }) {
  // Colors for charts
  const COLORS = {
    brand: '#5c7cfa',
    brandLight: '#748ffc',
    sleep: '#51cf66',
    study: '#fcc419',
    stress: '#ff6b6b',
    screen: '#845ef7'
  };

  const PIE_COLORS = ['#51cf66', '#fcc419', '#ff6b6b'];

  // Custom tooltip style
  const customTooltipStyle = {
    backgroundColor: 'var(--color-surface-elevated)',
    border: '1px solid var(--color-border-default)',
    borderRadius: '12px',
    padding: '12px 16px',
    boxShadow: 'var(--shadow-elevated)',
    color: 'var(--color-text-primary)',
    fontSize: '13px'
  };

  // Bar chart data — current entry metrics
  const barData = currentEntry ? [
    { name: 'Sleep', value: currentEntry.sleepHours, fill: COLORS.sleep },
    { name: 'Study', value: currentEntry.studyHours, fill: COLORS.study },
    { name: 'Stress', value: currentEntry.stressLevel, fill: COLORS.stress },
    { name: 'Screen', value: currentEntry.screenTime || 0, fill: COLORS.screen },
  ] : [];

  // Pie chart data — burnout level distribution
  const pieData = stats?.distribution ? [
    { name: 'Low', value: stats.distribution.Low },
    { name: 'Moderate', value: stats.distribution.Moderate },
    { name: 'High', value: stats.distribution.High },
  ].filter(d => d.value > 0) : [];

  // Line chart data — progress over time
  const lineData = stats?.timeSeries?.map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    burnoutScore: point.burnoutScore,
    sleepHours: point.sleepHours,
    studyHours: point.studyHours,
    stressLevel: point.stressLevel
  })) || [];

  const hasData = entries && entries.length > 0;

  if (!hasData && !currentEntry) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-surface-secondary rounded-2xl border border-border-default p-12 text-center"
      >
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">No Analytics Yet</h3>
        <p className="text-text-secondary max-w-sm mx-auto">
          Head to the Analyze tab and submit your first entry to see charts and analytics here.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Row: Bar chart + Pie chart */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar Chart — Current Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-elevated rounded-2xl border border-border-default shadow-card p-6"
        >
          <h3 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            📊 Current Metrics
          </h3>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border-default)' }}
                />
                <YAxis
                  tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--color-border-default)' }}
                />
                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: 'var(--color-surface-tertiary)' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={50}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[260px] flex items-center justify-center text-text-muted text-sm">
              Submit an analysis to see metrics
            </div>
          )}
        </motion.div>

        {/* Pie Chart — Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-surface-elevated rounded-2xl border border-border-default shadow-card p-6"
        >
          <h3 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            🥧 Burnout Distribution
          </h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[260px] flex items-center justify-center text-text-muted text-sm">
              Need more entries for distribution
            </div>
          )}

          {/* Legend */}
          {pieData.length > 0 && (
            <div className="flex justify-center gap-6 mt-2">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }} />
                  <span className="text-xs text-text-secondary">{entry.name}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom: Line Chart — Progress Over Time */}
      {lineData.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-surface-elevated rounded-2xl border border-border-default shadow-card p-6"
        >
          <h3 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            📈 Burnout Score Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
              <defs>
                <linearGradient id="burnoutGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.brand} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.brand} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.sleep} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={COLORS.sleep} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
              <XAxis
                dataKey="date"
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                axisLine={{ stroke: 'var(--color-border-default)' }}
              />
              <YAxis
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
                axisLine={{ stroke: 'var(--color-border-default)' }}
              />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend />
              <Area
                type="monotone"
                dataKey="burnoutScore"
                stroke={COLORS.brand}
                fill="url(#burnoutGradient)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.brand }}
                name="Burnout Score"
              />
              <Line
                type="monotone"
                dataKey="sleepHours"
                stroke={COLORS.sleep}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS.sleep }}
                name="Sleep"
              />
              <Line
                type="monotone"
                dataKey="stressLevel"
                stroke={COLORS.stress}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS.stress }}
                name="Stress"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Weekly Summary Card */}
      {stats?.averages && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-surface-elevated rounded-2xl border border-border-default shadow-card p-6"
        >
          <h3 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            📋 Averages Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: 'Avg Sleep', value: `${stats.averages.sleepHours}h`, icon: '🌙', color: 'text-burnout-low' },
              { label: 'Avg Study', value: `${stats.averages.studyHours}h`, icon: '📚', color: 'text-burnout-moderate' },
              { label: 'Avg Stress', value: `${stats.averages.stressLevel}`, icon: '🧘', color: 'text-burnout-high' },
              { label: 'Avg Screen', value: `${stats.averages.screenTime}h`, icon: '📱', color: 'text-purple-500' },
              { label: 'Avg Burnout', value: `${stats.averages.burnoutScore}`, icon: '🧠', color: 'text-brand-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-surface-secondary rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
