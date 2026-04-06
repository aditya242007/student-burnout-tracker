import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChat, HiOutlineX, HiOutlinePaperAirplane } from 'react-icons/hi';

/**
 * Chatbot — Floating chat widget for mental health tips
 * Rule-based responses with pre-written wellness advice
 */

// Knowledge base for the chatbot
const RESPONSES = {
  greetings: [
    "Hey there! 👋 I'm your wellness buddy. Ask me about sleep tips, stress management, study techniques, or anything about mental health!",
    "Hi! 😊 I'm here to help you stay mentally healthy. What would you like to know about?"
  ],
  sleep: [
    "🌙 **Sleep Tips:**\n\n• Set a consistent bedtime — your body loves routine\n• Avoid screens 30 min before bed (or use blue light filter)\n• Keep your room cool (65-68°F / 18-20°C)\n• Try the 4-7-8 breathing technique\n• No caffeine after 2 PM",
    "💤 **Why sleep matters for students:**\n\nDuring sleep, your brain consolidates memories and clears toxins. Just one extra hour can improve test scores by up to 20%!\n\nTry to get 7-9 hours consistently."
  ],
  stress: [
    "🧘 **Quick Stress Relief:**\n\n• Box breathing: Inhale 4s → Hold 4s → Exhale 4s → Hold 4s\n• Progressive muscle relaxation\n• 5-minute journaling\n• Go for a walk in nature\n• Talk to someone you trust",
    "💆 **Managing Academic Stress:**\n\n• Break big tasks into small ones\n• Use the 2-minute rule: if it takes <2 mins, do it now\n• Practice saying 'no' to overcommitments\n• Schedule worry time (seriously!)\n• Remember: your worth isn't your GPA"
  ],
  study: [
    "📚 **Smart Study Techniques:**\n\n• **Pomodoro:** 25 min work → 5 min break\n• **Active Recall:** Test yourself instead of re-reading\n• **Spaced Repetition:** Review at increasing intervals\n• **Feynman Technique:** Explain concepts simply\n• Take a 15-min walk every 90 minutes",
    "🎯 **Productivity Hacks:**\n\n• Study your hardest subject first\n• Use website blockers during focus time\n• Change study locations for better retention\n• Teach what you learn to someone else\n• Reward yourself after hitting goals"
  ],
  burnout: [
    "🔥 **Burnout Recovery Tips:**\n\n• It's okay to take a break — rest is productive\n• Reconnect with hobbies you've neglected\n• Set firm boundaries on study hours\n• Talk about how you're feeling\n• Consider speaking with a counselor\n\nRemember: you can't pour from an empty cup.",
    "⚠️ **Signs of Burnout:**\n\n• Constant exhaustion even after rest\n• Feeling disconnected or cynical\n• Decreased academic performance\n• Physical symptoms (headaches, stomach issues)\n• Loss of motivation\n\nIf you recognize these, please reach out to your university's wellness center."
  ],
  motivation: [
    "💪 **Motivation Boosters:**\n\n• Write down 3 things you're grateful for\n• Visualize your future self thanking you\n• Start with just 5 minutes — momentum builds\n• Celebrate small wins\n• Surround yourself with motivated people",
    "🌟 **Remember:**\n\n\"It's not about being the best. It's about being better than you were yesterday.\"\n\nProgress isn't always linear. Bad days don't erase good ones. You're doing better than you think!"
  ],
  help: [
    "📋 **I can help you with:**\n\n• `sleep` — Sleep hygiene tips\n• `stress` — Stress management\n• `study` — Study techniques\n• `burnout` — Burnout prevention\n• `motivation` — Staying motivated\n• `break` — Break suggestions\n\nJust type any of these topics!"
  ],
  break: [
    "⏰ **Suggested Break Activities:**\n\n• 5 min: Stretch, deep breaths, look out window\n• 15 min: Walk, snack, listen to music\n• 30 min: Exercise, meditate, call a friend\n• 1 hour: Cook a meal, go outside, nap\n\nBreaks aren't laziness — they're strategy!"
  ],
  default: [
    "I'm not sure about that, but I'm here to help with sleep, stress, study tips, burnout prevention, and motivation! Type `help` to see what I can answer. 😊",
    "Hmm, I don't have info on that topic yet. Try asking about sleep, stress, studying, or burnout! Type `help` for a full list."
  ]
};

function getResponse(input) {
  const lower = input.toLowerCase().trim();

  if (/^(hi|hello|hey|sup|yo|howdy|greetings)/i.test(lower)) {
    return randomChoice(RESPONSES.greetings);
  }
  if (/sleep|tired|insomnia|rest|nap/i.test(lower)) {
    return randomChoice(RESPONSES.sleep);
  }
  if (/stress|anxiety|anxious|worried|nervous|overwhelm/i.test(lower)) {
    return randomChoice(RESPONSES.stress);
  }
  if (/study|focus|concentrate|learn|exam|test|homework|assignment/i.test(lower)) {
    return randomChoice(RESPONSES.study);
  }
  if (/burnout|burn out|exhausted|drained|overwork/i.test(lower)) {
    return randomChoice(RESPONSES.burnout);
  }
  if (/motivat|inspire|lazy|procrastinat|give up/i.test(lower)) {
    return randomChoice(RESPONSES.motivation);
  }
  if (/help|what can you|menu|options|commands/i.test(lower)) {
    return randomChoice(RESPONSES.help);
  }
  if (/break|relax|chill|rest|recharge/i.test(lower)) {
    return randomChoice(RESPONSES.break);
  }
  return randomChoice(RESPONSES.default);
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hey! 👋 I'm your wellness buddy. Ask me about sleep, stress, study tips, or burnout prevention!", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(input);
      setMessages(prev => [...prev, { role: 'bot', content: response, timestamp: new Date() }]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-bg text-white shadow-xl
                   hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center
                   cursor-pointer border-none z-50"
        aria-label="Open chat"
      >
        {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineChat className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[360px] max-h-[500px] bg-surface-elevated rounded-2xl
                       border border-border-default shadow-elevated overflow-hidden z-50
                       flex flex-col"
          >
            {/* Header */}
            <div className="gradient-bg p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Wellness Buddy</h4>
                <p className="text-white/70 text-xs">Always here for you</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'gradient-bg text-white rounded-br-md'
                        : 'bg-surface-secondary text-text-primary rounded-bl-md border border-border-light'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border-default">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about wellness..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-surface-secondary border border-border-default
                             text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30
                             placeholder:text-text-muted"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl gradient-bg text-white cursor-pointer border-none
                             disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  <HiOutlinePaperAirplane className="w-4 h-4 rotate-90" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
