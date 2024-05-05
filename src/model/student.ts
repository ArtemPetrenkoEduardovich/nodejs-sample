import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress {
	country: string;
	town: string;
	addressString: string;
}

export interface IStudent extends Document {
	name: string;
	surname: string;
	groupId: string;
	birthDate: Date;
	phoneNumbers?: string[]
	address?: IAddress

  /** will be added by mongo */
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema({
  country: String,
  town: String,
  addressString: String,
});

const studentSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  surname: {
    required: true,
    type: String,
  },

  groupId: {
    required: true,
    type: String,
    ref: 'Group',
  },

  birthDate: {
    required: true,
    type: Date,
  },

  phoneNumbers: {
    required: false,
    type: Array,
  },

  address: {
    required: false,
    type: addressSchema,
  },
},
{
  /**
	 * The timestamps option tells mongoose to assign createdAt and updatedAt
	 * fields to your schema. The type assigned is Date.
	 */
  timestamps: true,
  timezone: 'UTC',
},
);

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
