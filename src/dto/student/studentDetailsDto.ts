import { Address } from 'src/dto/address/address';

export interface StudentDetailsDto {
	name: string;
	surname: string;
	groupId: string;
	birthDate: Date;
	phoneNumbers: string[];
	address?: Address;
	createdAt: Date;
	updatedAt: Date;
}
