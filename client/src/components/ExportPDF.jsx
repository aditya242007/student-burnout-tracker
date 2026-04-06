import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

/**
 * ExportPDF — Generates a downloadable PDF report of the burnout analysis
 */
export default function ExportPDF({ entry, recommendations }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(22);
    doc.setTextColor(66, 99, 235); // brand color
    doc.text('Student Burnout Tracker', pageWidth / 2, 25, { align: 'center' });

    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128);
    doc.text('Burnout Analysis Report', pageWidth / 2, 33, { align: 'center' });

    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`, pageWidth / 2, 40, { align: 'center' });

    // Divider line
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 45, pageWidth - 20, 45);

    // Burnout Score Section
    doc.setFontSize(16);
    doc.setTextColor(26, 29, 46);
    doc.text('Burnout Analysis', 20, 58);

    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);

    const levelColor = {
      Low: [81, 207, 102],
      Moderate: [252, 196, 25],
      High: [255, 107, 107]
    };
    const color = levelColor[entry.burnoutLevel] || [107, 114, 128];

    // Score box
    doc.setFillColor(248, 249, 252);
    doc.roundedRect(20, 62, pageWidth - 40, 35, 3, 3, 'F');

    doc.setFontSize(28);
    doc.setTextColor(...color);
    doc.text(`${entry.burnoutScore}`, 35, 82);

    doc.setFontSize(12);
    doc.text(`${entry.burnoutLevel} Burnout`, 65, 77);

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(`Score calculated from your daily metrics`, 65, 85);

    // Metrics
    doc.setFontSize(14);
    doc.setTextColor(26, 29, 46);
    doc.text('Daily Metrics', 20, 112);

    const metrics = [
      { label: 'Sleep Hours', value: `${entry.sleepHours} hours`, emoji: '🌙' },
      { label: 'Study Hours', value: `${entry.studyHours} hours`, emoji: '📚' },
      { label: 'Stress Level', value: `${entry.stressLevel}/10`, emoji: '🧘' },
      { label: 'Screen Time', value: `${entry.screenTime || 0} hours`, emoji: '📱' },
    ];

    let y = 120;
    doc.setFontSize(10);
    metrics.forEach(metric => {
      doc.setTextColor(26, 29, 46);
      doc.text(`${metric.label}:`, 25, y);
      doc.setTextColor(92, 124, 250);
      doc.text(metric.value, 85, y);
      y += 8;
    });

    // Recommendations
    y += 8;
    doc.setFontSize(14);
    doc.setTextColor(26, 29, 46);
    doc.text('Recommendations', 20, y);
    y += 8;

    doc.setFontSize(9);
    if (recommendations && recommendations.length > 0) {
      recommendations.forEach(rec => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        doc.setTextColor(26, 29, 46);
        doc.setFontSize(10);
        doc.text(`${rec.icon} ${rec.title}`, 25, y);
        y += 6;

        doc.setTextColor(107, 114, 128);
        doc.setFontSize(9);
        // Word wrap the message
        const lines = doc.splitTextToSize(rec.message, pageWidth - 50);
        doc.text(lines, 25, y);
        y += lines.length * 4.5 + 6;
      });
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('Student Burnout Tracker - Take care of your mental health', pageWidth / 2, 285, { align: 'center' });

    // Save
    doc.save(`burnout-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={generatePDF}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                 bg-surface-secondary border border-border-default text-text-primary
                 font-medium hover:bg-surface-tertiary hover:border-brand-500/30
                 transition-all duration-200 cursor-pointer"
    >
      <HiOutlineDocumentDownload className="w-5 h-5" />
      Export Report as PDF
    </motion.button>
  );
}
