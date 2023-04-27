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

  async findAll(word: string): Promise<Concert[]> {
    const searchRegex = new RegExp(word, 'i');

    return await this.concertModel.find({
      $or: [
        { name: { $regex: searchRegex } },
        { artist_name: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
      ],
    });
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
