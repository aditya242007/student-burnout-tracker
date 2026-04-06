import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import BurnoutForm from '../components/BurnoutForm';
import ResultCard from '../components/ResultCard';
import Recommendations from '../components/Recommendations';
import Charts from '../components/Charts';
import History from '../components/History';
import ExportPDF from '../components/ExportPDF';

/**
 * Dashboard — Main analysis page
 * Houses the form, results, charts, recommendations, and history
 */
export default function Dashboard() {
  // Generate a persistent anonymous userId
  const [userId] = useState(() => {
    const saved = localStorage.getItem('userId');
    if (saved) return saved;
    const id = 'user_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('userId', id);
    return id;
  });

  const [result, setResult] = useState(null);       // Latest analysis result
  const [stats, setStats] = useState(null);          // Aggregated stats for charts
  const [entries, setEntries] = useState([]);         // History entries
  const [loading, setLoading] = useState(false);      // Form submission loading
  const [activeTab, setActiveTab] = useState('analyze'); // 'analyze' | 'history' | 'analytics'

  // Fetch history and stats on mount
  const fetchData = useCallback(async () => {
    try {
      const [entriesRes, statsRes] = await Promise.all([
        axios.get(`/api/entries/${userId}`),
        axios.get(`/api/entries/${userId}/stats`)
      ]);
      setEntries(entriesRes.data.entries);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/entries', {
        ...formData,
        userId
      });
      setResult(response.data);
      // Refresh history and stats
      await fetchData();
    } catch (error) {
      console.error('Error submitting:', error);
      // Fallback: calculate client-side if server is down
      const score = (formData.studyHours * 1.5) + (formData.stressLevel * 2) + (formData.screenTime * 1) - formData.sleepHours;
      const burnoutScore = Math.max(0, Math.round(score * 10) / 10);
      const burnoutLevel = burnoutScore < 15 ? 'Low' : burnoutScore <= 25 ? 'Moderate' : 'High';
      setResult({
        entry: { ...formData, burnoutScore, burnoutLevel, createdAt: new Date().toISOString() },
        recommendations: [
          { category: 'Note', icon: '⚠️', title: 'Running in offline mode', message: 'Could not connect to the server. Results are calculated locally and won\'t be saved.', priority: 'medium' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle entry deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/entries/${id}`);
      await fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const tabs = [
    { id: 'analyze', label: '🧠 Analyze', icon: '🧠' },
    { id: 'history', label: '📅 History', icon: '📅' },
    { id: 'analytics', label: '📊 Analytics', icon: '📊' },
  ];

  return (
    <div className="pt-20 pb-12 min-h-screen bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">
            Analyze your daily habits and track your burnout levels over time.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-surface-secondary rounded-xl p-1.5 w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border-none ${
                activeTab === tab.id
                  ? 'bg-surface-elevated text-text-primary shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'analyze' && (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              <BurnoutForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-3 space-y-6">
              {result ? (
                <>
                  <ResultCard result={result} />
                  <Recommendations recommendations={result.recommendations} />
                  {result.entry && <ExportPDF entry={result.entry} recommendations={result.recommendations} />}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-surface-secondary rounded-2xl border border-border-default p-12 text-center"
                >
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Start Your Analysis
                  </h3>
                  <p className="text-text-secondary max-w-sm mx-auto">
                    Fill out the form with your daily metrics to get your burnout analysis and personalized recommendations.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <History entries={entries} onDelete={handleDelete} />
        )}

        {activeTab === 'analytics' && (
          <Charts stats={stats} entries={entries} currentEntry={result?.entry} />
        )}
      </div>
    </div>
  );
}
