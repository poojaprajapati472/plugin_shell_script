import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = user & Document;
@Schema()
export class user {

  @Prop()
  email: string;

  @Prop({ required: true })
  username: string;


  @Prop({ required: true })
  password: string;

}
export const user_schema = SchemaFactory.createForClass(user);
