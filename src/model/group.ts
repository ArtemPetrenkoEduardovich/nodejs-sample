import mongoose, { Document, Schema } from 'mongoose';

export interface IGroup extends Document {
	name: string;
	startYear: number;
}

const groupSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  startYear: {
    required: true,
    type: Number,
  },
});

const Group = mongoose.model<IGroup>('Group', groupSchema);

export default Group;
