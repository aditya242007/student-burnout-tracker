/**
 * Burnout Scoring Engine
 * Calculates burnout score and generates personalized recommendations
 */

/**
 * Calculate burnout score from lifestyle metrics
 * Formula: (studyHours * 1.5 + stressLevel * 2 + screenTime * 1) - sleepHours
 */
export function calculateBurnoutScore({ sleepHours, studyHours, stressLevel, screenTime = 0 }) {
  const score = (studyHours * 1.5) + (stressLevel * 2) + (screenTime * 1) - sleepHours;
  return Math.max(0, Math.round(score * 10) / 10); // Ensure non-negative, 1 decimal
}

/**
 * Categorize burnout level based on score
 * Low: < 15 | Moderate: 15–25 | High: > 25
 */
export function getBurnoutLevel(score) {
  if (score < 15) return 'Low';
  if (score <= 25) return 'Moderate';
  return 'High';
}

/**
 * Generate personalized recommendations based on metrics and burnout level
 * Returns human-toned, actionable suggestions
 */
export function getRecommendations({ sleepHours, studyHours, stressLevel, screenTime = 0, burnoutLevel }) {
  const recommendations = [];

  // Sleep-based recommendations
  if (sleepHours < 6) {
    recommendations.push({
      category: 'Sleep',
      icon: '🌙',
      title: 'Your sleep needs attention',
      message: `You're only getting ${sleepHours} hours of sleep. Your brain consolidates learning during sleep — aim for 7-8 hours. Try setting a consistent bedtime and avoid screens 30 minutes before sleeping.`,
      priority: 'high'
    });
  } else if (sleepHours < 7) {
    recommendations.push({
      category: 'Sleep',
      icon: '🌙',
      title: 'Almost there with sleep',
      message: `${sleepHours} hours is close, but not quite enough. Even one extra hour of sleep can improve memory retention by 20%. Try winding down 15 minutes earlier tonight.`,
      priority: 'medium'
    });
  } else {
    recommendations.push({
      category: 'Sleep',
      icon: '🌙',
      title: 'Great sleep habits!',
      message: `${sleepHours} hours of sleep is excellent! Keep maintaining this routine — consistent sleep is one of the strongest defenses against burnout.`,
      priority: 'low'
    });
  }

  // Study-based recommendations
  if (studyHours > 10) {
    recommendations.push({
      category: 'Productivity',
      icon: '📚',
      title: 'You might be overworking',
      message: `${studyHours} hours of study is intense. Research shows diminishing returns after 6 focused hours. Try the Pomodoro Technique: 25 minutes of work, 5 minutes of break. Quality beats quantity.`,
      priority: 'high'
    });
  } else if (studyHours > 6) {
    recommendations.push({
      category: 'Productivity',
      icon: '📚',
      title: 'Balance your study sessions',
      message: `${studyHours} hours of studying is substantial. Make sure you're taking breaks every 90 minutes — your focus naturally dips in cycles. A 15-minute walk can recharge your brain.`,
      priority: 'medium'
    });
  } else {
    recommendations.push({
      category: 'Productivity',
      icon: '📚',
      title: 'Good study balance',
      message: `${studyHours} hours of focused study is a healthy amount. Keep using active recall and spaced repetition for maximum retention.`,
      priority: 'low'
    });
  }

  // Stress-based recommendations
  if (stressLevel >= 8) {
    recommendations.push({
      category: 'Stress',
      icon: '🧘',
      title: 'Your stress is very high',
      message: `A stress level of ${stressLevel}/10 is concerning. Try box breathing: inhale 4 seconds, hold 4, exhale 4, hold 4. Even 5 minutes of meditation can reduce cortisol levels significantly. Consider talking to someone you trust.`,
      priority: 'high'
    });
  } else if (stressLevel >= 5) {
    recommendations.push({
      category: 'Stress',
      icon: '🧘',
      title: 'Managing moderate stress',
      message: `Stress at ${stressLevel}/10 is manageable but watch out. Try journaling for 10 minutes to externalize your thoughts. Physical exercise — even a 20-minute walk — is one of the best stress relievers.`,
      priority: 'medium'
    });
  } else {
    recommendations.push({
      category: 'Stress',
      icon: '🧘',
      title: 'Stress is under control',
      message: `Nice! A stress level of ${stressLevel}/10 means you're handling things well. Keep doing what works — and remember it's okay to ask for help before things build up.`,
      priority: 'low'
    });
  }

  // Screen time recommendations
  if (screenTime > 8) {
    recommendations.push({
      category: 'Digital Wellness',
      icon: '📱',
      title: 'Too much screen time',
      message: `${screenTime} hours of screen time is high. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds. Consider using app timers and blue light filters.`,
      priority: 'high'
    });
  } else if (screenTime > 4) {
    recommendations.push({
      category: 'Digital Wellness',
      icon: '📱',
      title: 'Watch your screen time',
      message: `${screenTime} hours on screens is moderate. Try to differentiate productive vs. passive screen time. Schedule device-free breaks to rest your eyes and mind.`,
      priority: 'medium'
    });
  }

  // Break schedule recommendation for moderate/high burnout
  if (burnoutLevel !== 'Low') {
    recommendations.push({
      category: 'Breaks',
      icon: '⏰',
      title: 'Suggested break schedule',
      message: burnoutLevel === 'High' 
        ? 'You need more breaks: 5 min every 25 min, 15 min every 90 min, and a 1-hour lunch. Consider taking tomorrow off if possible — recovery is productive.'
        : 'Try this schedule: 5-minute break every 30 minutes, a 15-minute walk every 2 hours, and make sure you have at least 2 hours of relaxation time daily.',
      priority: burnoutLevel === 'High' ? 'high' : 'medium'
    });
  }

  return recommendations;
}
