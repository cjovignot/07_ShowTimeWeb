import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(concert: Category): Promise<Category> {
    const newCategory = new this.categoryModel(concert);
    return newCategory.save();
  }

  async findAll(query: any): Promise<Category[]> {
    return this.categoryModel.find(query).exec();
  }

  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, category: Category): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, category, { new: true }).exec();
  }

  async delete(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
