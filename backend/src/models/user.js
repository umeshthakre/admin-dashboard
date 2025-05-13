import mongoose, { Schema} from 'mongoose';


const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String},
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
},{timestamps:true});

export default mongoose.model('User', UserSchema);
