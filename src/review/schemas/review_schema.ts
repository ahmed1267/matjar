import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";



export type ReviewDocument = Review & Document;

// Define the shop schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class Review {
    @Prop({ min: 0, max: 5, required: true })
    rating: number;
    @Prop({ required: true, min: 15, max: 250 })
    description: string;
    @Prop({ type: Types.ObjectId, ref: 'Item' })
    item: string;
    @Prop({ required: true })
    title: string;
    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    shop: string;
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
