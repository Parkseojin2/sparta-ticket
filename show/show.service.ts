import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateShowDto } from './dto/create-show.dto';
import { Show } from './entities/show.entity';
import { ShowTime } from './entities/showTime.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(ShowTime)
    private showTimeRepository: Repository<ShowTime>,
  ) {}

  async create(createShowDto: CreateShowDto, times: Date[]): Promise<void> {
    const { name, description, category, location, price, imageUrl, seatsInfo } = createShowDto;

    const show = new Show();
    show.name = name;
    show.description = description;
    show.category = category;
    show.location = location;
    show.price = price;
    show.imageUrl = imageUrl;
    show.seatsInfo = seatsInfo;

    await this.showRepository.save(show);

    const showTimes: ShowTime[] = [];
    for (const time of times) {
      const showTime = new ShowTime();
      showTime.dateTime = time;
      await this.showTimeRepository.save(showTime);
      showTimes.push(showTime);
    }

    show.showTimes = showTimes;
    await this.showRepository.save(show);
  }

  async findAll(): Promise<{ name: string; category: string }[]> {
    const shows = await this.showRepository.find();
    return shows.map(show => ({ name: show.name, category: show.category }));
  }

  async findByCategory(category: string): Promise<{ name: string; category: string }[]> {
    const shows = await this.showRepository.find({ where: { category } });
    return shows.map(show => ({ name: show.name, category: show.category }));
  }

  async findByName(name: string): Promise<{ name: string; category: string }[]> {
    const shows = await this.showRepository.find({ where: { name } });
    return shows.map(show => ({ name: show.name, category: show.category }));
  }

  async findOne(showId: number): Promise<Show> {
    const show = await this.showRepository.findOne({
      where: { id: showId },
      relations: ['showTimes'],
    });
    if (!show) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }
    return show;
  }
}
