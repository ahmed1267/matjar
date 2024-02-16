import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the document type for the shop schema
export type CardSliderDocument = CardSlider & Document;

// Define the shop schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class CardSlider {
    @Prop()
    links: string[]
    @Prop()
    photos: string[]
    @Prop()
    buttonsLinks: string[]
    @Prop()
    buttonsTitles: string[]
    @Prop()
    titles: string[]
    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    shop: string;

}

// Create the Mongoose schema for the Movie class
export const CardSliderSchema = SchemaFactory.createForClass(CardSlider);
