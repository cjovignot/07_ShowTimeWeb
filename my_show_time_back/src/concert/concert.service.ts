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

  async findAll(word: string, categoryId: string): Promise<Concert[]> {
    const searchRegex = new RegExp(word, 'i');
  
    let query: any = {
      $or: [
        { name: { $regex: searchRegex } },
        { artist_name: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
      ],
    };
  
    // If category_id is provided, add it to the query object
    if (categoryId) {
      query['category_id'] = categoryId;
    }
  
    return await this.concertModel.find(query);
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