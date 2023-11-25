import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import validator from 'validator';

export type EmailVerficationDocument = EmailVerification & Document;

// Define the user schema
@Schema({
  timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class EmailVerification {
  @Prop({
    required: true,
    validate: [
      (v: string) => validator.isEmail(v),
      'Please Enter A Valid Email',
    ],
  })
  email: string;

  @Prop({ required: true })
  emailToken: string;
}

export const EmailVerificationSchema =
  SchemaFactory.createForClass(EmailVerification);
