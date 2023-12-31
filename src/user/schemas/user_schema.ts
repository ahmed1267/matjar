import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import validator from 'validator';

// Enum for user roles
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SHOP_OWNER = 'shop_owner',
}

export enum UserExperienceType {
  STORE = 'store',
  SOCIALMEDIA = 'social_media',
}

export enum ReadyOption {
  PRODUCTS = 'products',
  DESIGN = 'design',
  STATEMENTS = 'statements',
  PAYMENTS = 'payments',
  LOGISTICS = 'logistics',
  DIGITAL_MARKETING = 'digital_marketing',
}

// Define the document type for the user schema
export type UserDocument = User & Document;

// Define the user schema
@Schema({
  timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class User {
  @Prop({ required: true }) // Ensure name is required
  name: string;

  @Prop({ required: true }) // Ensure password is required
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER }) // Add the role property
  role: UserRole;

  @Prop({
    required: true,
    unique: true,
    validate: [
      (v: string) => validator.isEmail(v),
      'Please Enter A Valid Email',
    ],
  })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, default: false })
  experience: boolean;

  @Prop({ required: true, default: false })
  firstShop: boolean;

  @Prop({
    required: true,
    enum: UserExperienceType,
    default: UserExperienceType.STORE,
  })
  experienceType: UserExperienceType;

  @Prop({ type: [{ type: String, enum: ReadyOption }], isArray: true })
  ready: ReadyOption[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Shop' })
  shop: string;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  reviews: string[];
}

// Create the Mongoose schema for the user class
export const UserSchema = SchemaFactory.createForClass(User);
