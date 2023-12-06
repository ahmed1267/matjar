import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, expires: 600000 })
export class Otp {
  @Prop({ required: true, unique: true, minlength: 4, maxlength: 4 })
  number: number;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
