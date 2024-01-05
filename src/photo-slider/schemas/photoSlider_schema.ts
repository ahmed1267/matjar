import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the document type for the shop schema
export type PhotoSliderDocument = PhotoSlider & Document;

// Define the shop schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class PhotoSlider {
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
    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    shop: string;
}

// Create the Mongoose schema for the Movie class
export const PhotoSliderSchema = SchemaFactory.createForClass(PhotoSlider);
