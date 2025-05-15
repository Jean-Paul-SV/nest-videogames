import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Videogame extends Document {
  static readonly modelName = 'Videogame';

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;
  
  @Prop()
  price: string;

  @Prop()
  releaseDate: Date;

  @Prop()
  category: string;

  @Prop({ unique: true })
  slug: string;
}

export const VideogameSchema = SchemaFactory.createForClass(Videogame);
