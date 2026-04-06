import mongoose from 'mongoose';

/**
 * Entry Schema — stores a single burnout analysis record
 * Each entry captures lifestyle metrics + calculated burnout data
 */
const entrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    default: 'anonymous'
  },
  sleepHours: {
    type: Number,
    required: true,
    min: 0,
    max: 24
  },
  studyHours: {
    type: Number,
    required: true,
    min: 0,
    max: 24
  },
  stressLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  screenTime: {
    type: Number,
    default: 0,
    min: 0,
    max: 24
  },
  burnoutScore: {
    type: Number,
    required: true
  },
  burnoutLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for efficient querying by user and date
entrySchema.index({ userId: 1, createdAt: -1 });

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
