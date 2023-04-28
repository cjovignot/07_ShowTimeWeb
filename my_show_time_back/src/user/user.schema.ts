
import { UpdateWithAggregationPipeline } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @Prop({ required: true, unique: true, lowercase: true, trim: true, match: /^\S+@\S+\.\S+$/ })
  email: string;

  @ApiProperty({ description: 'User password', example: 'Password123' })
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

  @ApiProperty({ description: 'User first name', example: 'John' })
  @Prop({ required: true })
  firstname: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  @Prop({ required: true })
  lastname: string;

  @ApiProperty({ description: 'User creation date', type: Date })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({ description: 'User last updated date', type: Date })
  @Prop({ default: Date.now })
  lastUpdated: Date;

  @ApiProperty({ description: 'User admin status', type: Boolean, default: false })
  @Prop({ default: false })
  isAdmin: boolean;

  @ApiProperty({ description: 'User archived status', type: Boolean, default: false })
  @Prop({ default: false })
  isArchived: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });

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

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update: any = this.getUpdate();
  let passwordToUpdate;

  if ('password' in update) {
    passwordToUpdate = update.password;
  } else if (update.$set && 'password' in update.$set) {
    passwordToUpdate = update.$set.password;
  }

  if (passwordToUpdate) {
    try {
      const hashedPassword = await bcrypt.hash(passwordToUpdate, SALT_ROUNDS);
      if (update.$set) {
        update.$set.password = hashedPassword;
      } else {
        update.password = hashedPassword;
      }
    } catch (err) {
      next(err);
    }
  }
  
  next();
});
