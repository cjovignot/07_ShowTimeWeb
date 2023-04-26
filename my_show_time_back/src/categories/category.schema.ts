import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '0' })
  count_concert: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
