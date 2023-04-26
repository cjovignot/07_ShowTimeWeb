// src/user/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true, match: /^\S+@\S+\.\S+$/ })
  email: string;

  @Prop({
    required: true,
    minlength: 8,
    validate: {
      validator: function (value: string) {
        return /\d/.test(value) && /[A-Z]/.test(value);
      },
      message: 'Password must contain at least one number and one uppercase letter',
    },
  })
  password: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  lastUpdated: Date;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isArchived: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

const SALT_ROUNDS = 10;

UserSchema.pre<UserDocument>('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre<UserDocument>('updateOne', function(next) {
  this.set({ lastUpdated: new Date() });
  next();
});
