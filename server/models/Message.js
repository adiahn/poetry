import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  }
});

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  replies: [replySchema],
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
export default Message; 