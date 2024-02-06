import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the document type for the reports schema
export type ReportsDocument = Reports & Document;

@Schema({
  timestamps: true, // Add timestamps for createdAt and updatedAt
})
export class Reports {

  // Monthly sales
  @Prop({ type: Map, of: Number, default: {} })
  monthlySales: Map<string, number>;

  // Items and their total sales
  @Prop({ type: [{ itemID: { type: Types.ObjectId, ref: 'Item' }, totalSales: Number }], default: [] })
  itemsSales: Types.Array<{ itemID: string; totalSales: number }>;

  // Clients and their ratings
  @Prop({ type: [{ clientID: { type: Types.ObjectId, ref: 'User' }, rating: Number }], default: [] })
  clientRatings: Types.Array<{ clientID: string; rating: number }>;

  // Days with the highest order counts
  @Prop({ type: Map, of: Number, default: {} })
  highOrderDays: Map<string, number>;

  // Months with the highest order counts
  @Prop({ type: Map, of: Number, default: {} })
  highOrderMonths: Map<string, number>;
}

// Create the Mongoose schema for the Reports class
export const ReportsSchema = SchemaFactory.createForClass(Reports);
