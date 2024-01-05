import { PartialType } from '@nestjs/mapped-types';
import { CreateCardSliderDto } from './create-card-slider.dto';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsArray } from 'class-validator';
export class UpdateCardSliderDto extends PartialType(CreateCardSliderDto) {

    @IsNotEmpty({ message: 'A shop must have at least one category' })
    @IsArray({ message: 'A shop must have a string array category' })
    photos: string[];

    @IsNotEmpty({ message: 'A shop must have at least one category' })
    @IsArray({ message: 'A shop must have a string array category' })
    buttonsLinks: string[];

    @IsNotEmpty({ message: 'A shop must have at least one category' })
    @IsArray({ message: 'A shop must have a string array category' })
    buttonsTitles: string[];

    @IsNotEmpty({ message: 'A shop must have at least one category' })
    @IsArray({ message: 'A shop must have a string array category' })
    links: string[];

    @IsNotEmpty({ message: 'A shop must have at least one category' })
    @IsArray({ message: 'A shop must have a string array category' })
    titles: string[];
}
