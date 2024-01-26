import { IsArray } from "class-validator";


export class CreateItemDto {
  name: string;
  price: number;
  amount: number;
  userID: string;
  description: string;
  @IsArray({ message: "Item categories must be an array" })
  category: string[];

  brand?: string;
  rating?: number;
  sizes?: string[];
  images?: string[];
  colors?: string[];
}
