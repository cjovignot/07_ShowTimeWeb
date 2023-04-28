
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
import { Concert } from './concert.schema';
import { ConcertService } from './concert.service';
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('concerts')
@Controller('concerts')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get()
  @ApiQuery({ name: 'word', required: false, description: 'Search query for concerts' })
  @ApiResponse({ status: 200, description: 'List of concerts', type: [Concert] })
  async findAll(@Query('word') word: any, @Query('category_id') categoryId: string): Promise<Concert[]> {
    return await this.concertService.findAll(word, categoryId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Concert ID' })
  @ApiResponse({ status: 200, description: 'Concert details', type: Concert })
  async findById(@Param('id') id: string): Promise<Concert> {
    return this.concertService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a concert', type: Concert })
  async create(@Body() concert: Concert): Promise<Concert> {
    return this.concertService.create(concert);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Concert ID' })
  @ApiResponse({ status: 200, description: 'Update a concert', type: Concert })
  async update(@Param('id') id: string, @Body() concert: Concert): Promise<Concert> {
    return this.concertService.update(id, concert);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Concert ID' })
  @ApiResponse({ status: 200, description: 'Delete a concert', type: Concert })
  async delete(@Param('id') id: string): Promise<Concert> {
    return this.concertService.delete(id);
  }
}