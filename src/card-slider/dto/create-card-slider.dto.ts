import { IsNotEmpty, IsArray } from "class-validator";
import { Types } from "mongoose";

export class CreateCardSliderDto {
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

    @IsNotEmpty({ message: 'A CardSlider must have a shop ID' })
    shop: Types.ObjectId;
}
