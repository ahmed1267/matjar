import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaType, SchemaTypes } from "mongoose";

// Define the document type for the shop schema
export type ShopDocument = Shop & Document

// Define the shop schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class Shop {
    @Prop({ required: true, unique: true }) // Ensure title is required and unique
    title: string;

    @Prop({ required: true }) // Ensure description is required
    description: string;

    @Prop({ required: true }) // Ensure releaseDate is required
    releaseDate: Date;

    @Prop({tyep: [SchemaTypes.ObjectId], ref: 'Item'})
    items:string[];

}

// Create the Mongoose schema for the Movie class
export const ShopSchema = SchemaFactory.createForClass(Shop)