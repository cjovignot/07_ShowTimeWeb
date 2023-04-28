import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Category } from './category.schema';
import { CategoryService } from './category.service';
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiQuery({ name: 'query', required: false, description: 'Search query for categories' })
  @ApiResponse({ status: 200, description: 'List of categories', type: [Category] })
  async findAll(@Query() query: any): Promise<Category[]> {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category details', type: Category })
  async findById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a category', type: Category })
  async create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Update a category', type: Category })
  async update(@Param('id') id: string, @Body() category: Category): Promise<Category> {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Delete a category', type: Category })
  async delete(@Param('id') id: string): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
