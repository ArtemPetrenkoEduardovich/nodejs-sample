import { Address } from 'src/dto/address/address';

export interface StudentSaveDto {
	name: string;
	surname: string;
	groupId: string;
	birthDate: Date;
	phoneNumbers?: string[]
	address?: Address
}
