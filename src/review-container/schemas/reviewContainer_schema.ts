import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";



export type ReviewContainerDocument = ReviewContainer & Document;

// Define the shop schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class ReviewContainer {
    @Prop()
    rating: number;
    @Prop()
    description: string;
    @Prop({ type: Types.ObjectId, ref: 'Item' })
    item: string;
    @Prop()
    title: string;
    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    shop: string;
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Review' })
    review: string
}

export const ReviewContainerSchema = SchemaFactory.createForClass(ReviewContainer);
