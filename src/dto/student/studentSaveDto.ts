import { Address } from 'src/dto/address/address';

export class StudentSaveDto {
  name?: string;
  surname?: string;
  groupId?: string;
  birthDate?: Date;
  phoneNumbers?: string[];
  address?: Address;
	
  constructor(data: Partial<StudentSaveDto>) {
    this.name = data.name;
    this.surname = data.surname;
    this.groupId = data.groupId;
    this.birthDate = data.birthDate;
    this.phoneNumbers = [...(data.phoneNumbers || [])];
    this.address = data.address ? {
      country: data.address.country,
      town: data.address.town,
      addressString: data.address.addressString,
    } : undefined;
  }
}
