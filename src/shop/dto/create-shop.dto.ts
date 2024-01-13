import {
  IsNotEmpty,
  IsString,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateShopDto {
  // Shop title, must not be empty, and should be a string
  @IsNotEmpty({ message: 'A shop must have a title' })
  @IsString({ message: 'A shop must have a string title' })
  title: string;

  @IsNotEmpty({ message: 'A shop must have a title' })
  @IsString({ message: 'A shop must have a string title' })
  userID: string;

  // Shop description, must not be empty, and should be a string
  @IsNotEmpty({ message: 'A shop must have a description' })
  @IsString({ message: 'A shop must have a string description' })
  @MinLength(10, {
    message: 'A shop description must be 10 chracters minimum',
  })
  @MaxLength(150, {
    message: 'A shop description must be 150 chracters maximum',
  })
  description: string;

  // Shop category, must not be empty and should be an array of strings
  @IsNotEmpty({ message: 'A shop must have at least one category' })
  @IsArray({ message: 'A shop must have a string array category' })
  category: string[];

  @IsArray({ message: 'A shop must have a string array custommers' })
  customers: string[];

  @IsNotEmpty({ message: 'A shop must have at least one container' })
  @IsArray({ message: 'A shop must have a string array containers' })
  containers: string[];
}
