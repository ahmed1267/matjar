import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the document type for the shop schema
export type OrderDocument = Order & Document;

export enum OrderStatusTypes {
  INPROGRESS = 'in progress',
  DELIVERED = 'delivered',
  CANCELED = 'canceled'
}
// Define the shop schema
@Schema({
  timestamps: true// Add timestamps for createdAt and updatedAt
})
export class Order {

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  sellerId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  buyerId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }], default: [] })
  items: Types.Array<{ itemId: string; price: number }>;

  @Prop({ required: true })
  deliveryType: boolean;

  @Prop({ required: true })
  priceTotal: number;

  @Prop({ required: true })
  paid: boolean;

  @Prop({ required: true, enum: OrderStatusTypes, default: OrderStatusTypes.INPROGRESS })
  status: string;

  @Prop()
  comments: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Shop' })
  shopId: string;

  createdAt: Date;

  updatedAt: Date;

}

// Create the Mongoose schema for the Movie class
export const OrderSchema = SchemaFactory.createForClass(Order);