import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreatePhotoSliderDto {
    title: string;
    subTitle: string;
    titleAndSubTitlePostion: number;
    titleAndSubTitleColor: string;
    buttonText: string;
    buttonLink: string;
    buttonColor: string;
    buttonTextColor: string;
    buttonPosition: number;
    photo: string;
    isContainer: boolean = false;
    isSlider: boolean = false;

    @IsNotEmpty({ message: 'A PhotoSlider must have a shop ID' })
    shop: Types.ObjectId;
}
