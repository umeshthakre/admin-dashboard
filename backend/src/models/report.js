import mongoose, { Schema } from 'mongoose';


const ReportSchema = new Schema({
  name: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved'],
    default: 'Pending'
  }

}, { timestamps: true });

export default mongoose.model('Report', ReportSchema);
