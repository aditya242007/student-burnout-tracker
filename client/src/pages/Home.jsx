import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineLightBulb, HiOutlineShieldCheck } from 'react-icons/hi';
import heroImg from '../assets/hero.png';

/**
 * Home — Hero landing page with feature cards
 */
export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <HiOutlineChartBar className="w-8 h-8" />,
      title: 'Track Daily Metrics',
      description: 'Log your sleep, study, stress, and screen time to monitor your lifestyle patterns.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <HiOutlineLightBulb className="w-8 h-8" />,
      title: 'Smart Analysis',
      description: 'Our intelligent engine calculates your burnout risk and identifies the root causes.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <HiOutlineShieldCheck className="w-8 h-8" />,
      title: 'Get Recommendations',
      description: 'Receive personalized, actionable tips to improve your wellbeing and academic performance.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="pt-16"> {/* offset for fixed navbar */}
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-400/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400">AI-Powered Analysis</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-text-primary">
                Track Your{' '}
                <span className="gradient-text">Mental Health</span>{' '}
                & Avoid Burnout
              </h1>

              <p className="text-lg text-text-secondary mb-8 max-w-lg leading-relaxed">
                Don't let burnout derail your academic journey. Our intelligent tracker analyzes your daily habits
                and provides personalized recommendations to keep you performing at your best.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-3.5 rounded-xl gradient-bg text-white font-semibold text-lg shadow-lg
                             hover:shadow-xl transition-shadow duration-300 cursor-pointer border-none animate-pulse-glow"
                >
                  Start Analysis →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 rounded-xl bg-surface-tertiary text-text-primary font-semibold text-lg
                             border border-border-default hover:border-brand-500/30 transition-all duration-300 cursor-pointer"
                >
                  Learn More
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { value: '10K+', label: 'Students Tracked' },
                  { value: '95%', label: 'Accuracy Rate' },
                  { value: '24/7', label: 'Available' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-text-muted">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute inset-0 gradient-bg rounded-3xl blur-3xl opacity-20 scale-110" />
                <img
                  src={heroImg}
                  alt="Student wellness illustration"
                  className="relative z-10 w-full max-w-md lg:max-w-lg animate-float drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Three simple steps to understand and improve your mental wellbeing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="bg-surface-elevated rounded-2xl p-8 border border-border-default
                              shadow-card hover:shadow-elevated transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full gradient-bg flex items-center justify-center
                                text-white text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center
                                 text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="gradient-bg rounded-3xl p-12 sm:p-16 relative overflow-hidden"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Take Control?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students who are actively monitoring their wellbeing and preventing burnout.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="px-10 py-4 rounded-xl bg-white text-brand-700 font-bold text-lg shadow-xl
                           hover:shadow-2xl transition-all duration-300 cursor-pointer border-none"
              >
                Start Your Analysis Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-default py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-muted text-sm">
          <p>© 2026 Student Burnout Tracker. Built with ❤️ for student wellbeing.</p>
        </div>
      </footer>
    </div>
  );
}
