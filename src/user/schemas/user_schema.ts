import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';

// Enum for user roles
export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    SHOP_OWNER = 'shop_owner',
}

// Define the document type for the user schema
export type UserDocument = User & Document;

// Define the user schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class User {
    @Prop({ required: true, unique: true }) // Ensure username is required and unique
    username: string;

    @Prop({ required: true }) // Ensure name is required
    name: string;

    @Prop({ required: true }) // Ensure password is required
    password: string;

    @Prop({ required: true, enum: UserRole, default: UserRole.USER }) // Add the role property
    role: UserRole;

    // async comparePassword(candidatePassword: string): Promise<boolean> {
    //     return bcrypt.compare(candidatePassword, this.password);
    // }
}

// Create the Mongoose schema for the user class
export const UserSchema = SchemaFactory.createForClass(User);
