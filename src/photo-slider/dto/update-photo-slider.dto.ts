import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoSliderDto } from './create-photo-slider.dto';

export class UpdatePhotoSliderDto extends PartialType(CreatePhotoSliderDto) {
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
    isContainer: boolean;
    isSlider: boolean;
}
