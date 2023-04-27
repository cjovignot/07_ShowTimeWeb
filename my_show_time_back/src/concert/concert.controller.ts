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

@Controller('concerts')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get()
  async findAll(@Query('word') word: any): Promise<Concert[]> {
    return await this.concertService.findAll(word);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Concert> {
    return this.concertService.findById(id);
  }

  @Post()
  async create(@Body() concert: Concert): Promise<Concert> {
    return this.concertService.create(concert);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() concert: Concert): Promise<Concert> {
    return this.concertService.update(id, concert);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Concert> {
    return this.concertService.delete(id);
  }
}
