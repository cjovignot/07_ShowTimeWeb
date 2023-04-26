import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Concert, ConcertDocument } from './concert.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel(Concert.name) private concertModel: Model<ConcertDocument>,
  ) {}

  async create(concert: Concert): Promise<Concert> {
    const newConcert = new this.concertModel(concert);
    return newConcert.save();
  }

  async findAll(): Promise<Concert[]> {
    return this.concertModel.find().exec();
  }

  async findById(id: string): Promise<Concert> {
    return this.concertModel.findById(id).exec();
  }

  async update(id: string, concert: Concert): Promise<Concert> {
    return this.concertModel.findByIdAndUpdate(id, concert, { new: true }).exec();
  }

  async delete(id: string): Promise<Concert> {
    return this.concertModel.findByIdAndDelete(id).exec();
  }
}
