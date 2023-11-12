import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Enum for user roles
export enum Category {
    ACCSESSORIES = 'accessories',
    HOME = 'home',
    GYM = 'gym',
    OTHERS = 'others'
}

// Define the document type for the user schema
export type ItemDocument = Item & Document;

// Define the user schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class Item {

    @Prop({ required: true, unique: true }) // Ensure name is required
    name: string;

    @Prop({ required: true, enum: Category, default: Category.OTHERS }) // Add the role property
    category: Category;

    @Prop({ required: true })
    image: String;

    @Prop({ required: true })
    description: String;

    @Prop({ required: true })
    quantity: Number;
}

// Create the Mongoose schema for the user class
export const ItemSchema = SchemaFactory.createForClass(Item);
