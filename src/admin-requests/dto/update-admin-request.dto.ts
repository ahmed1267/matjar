import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminRequestDto } from './create-admin-request.dto';
import { IsString } from 'class-validator';

export class UpdateAdminRequestDto extends PartialType(CreateAdminRequestDto) {
    @IsString()
    adminId: string;
    @IsString()
    status?: string;
}

