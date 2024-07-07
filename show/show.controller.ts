import { Controller, Get, Post, Body, Param, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { Show } from './entities/show.entity';
import { ShowService } from './show.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { Roles } from 'src/auth/roles.decorate';

@Controller('shows')
export class ShowController {
  showRepository: any;
  constructor(private readonly showService: ShowService) {}
  
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createShowDto: CreateShowDto) {
    const times = createShowDto.times;
    await this.showService.create(createShowDto, times);
    return { message: '공연이 성공적으로 등록되었습니다.' };
  }

  @Get()
  async findAll(): Promise<{ name: string, category: string }[]> {
    return this.showService.findAll();
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string): Promise<{ name: string, category: string }[]> {
    return this.showService.findByCategory(category);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<{ name: string, category: string }[]> {
    return this.showService.findByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Show> {
    const showId = parseInt(id, 10);
    if (isNaN(showId)) {
      throw new NotFoundException('공연 정보를 다시 확인하여 주십시오.');
    }
    const show = await this.showService.findOne(showId);
    if (!show) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }
    return show;
  }
  }

 

