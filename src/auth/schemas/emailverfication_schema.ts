import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EmailVerficationDocument = EmailVerification & Document;

// Define the user schema
@Schema({
    timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class EmailVerification {
    email: string;
    emailToken: string;
    timestamp: Date;
}

export const EmailVerificationSchema = SchemaFactory.createForClass(EmailVerification);