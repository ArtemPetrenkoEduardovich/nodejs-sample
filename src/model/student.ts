import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
	name: string;
	surname: string;
	groupId: string; // todo
	birthDate: Date;
	phoneNumbers: string[]
	// address: string

	createdAt: Date;
	updatedAt: Date;
}

const studentSchema = new Schema({
	/**
	 * The status of the category
	 * @type {Enum}
	 */
	status: {
		// default: ACTIVE,
		// enum: [ACTIVE, DELETED],
		type: String,
	},
	/**
	 * The name of the category
	 * @type {String}
	 */
	name: {
		required: true,
		type: String
	},
	/**
	 * The Id of the account the category belongs to
	 * @type {Number}
	 */
	accountId: {
		required: true,
		type: Number
	},
	/**
	 * The language of the category
	 * @type {String}
	 */
	language: {
		required: true,
		type: String
	},
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
