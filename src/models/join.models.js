import mongoose from 'mongoose';

const joinSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
});

joinSchema.index({ postId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Join', joinSchema);