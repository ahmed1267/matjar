import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the document type for the shop schema
export type OrderDocument = Order & Document;

export enum OrderStatusTypes {
    INPROGRESS = 'in_progress',
    DELIVERED = 'delivered',
    CANCELED = 'canceled'
  }
// Define the shop schema
@Schema({
  timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class Order {

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  sellerID: string;

  @Prop({required: true, type: Types.ObjectId, ref: 'User'})
  buyerID: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }], default: [] })
  items: Types.Array<{ itemID: string; price: number }>;

  @Prop({required: true})
  deliveryType: boolean;

  @Prop({required: true})
  priceTotal: number;

  @Prop({required: true})
  paid: boolean;

  @Prop({required: true, enum:OrderStatusTypes, default:OrderStatusTypes.INPROGRESS})
  status: string;

  @Prop()
  comments: string;
}

// Create the Mongoose schema for the Movie class
export const OrderSchema = SchemaFactory.createForClass(Order);