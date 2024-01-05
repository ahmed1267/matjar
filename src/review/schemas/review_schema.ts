import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";



export type ReviewDocument = Review & Document;

// Define the shop schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class Review {
    rating: number;
    description: string;
    product: string;
    title: string;
    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    shop: string;
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
