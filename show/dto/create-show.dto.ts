import { Transform, plainToClass } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연에 대한 소개를 입력해주세요.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리를 지정해주세요.' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 지정해주세요.' })
  location: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연 금액을 작성해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 올려주세요.' })
  imageUrl: string;

  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((dateStr: string) => new Date(dateStr));
    }
    return value;
  })
  @IsArray()
  @IsDate({ each: true })
  @IsNotEmpty({ message: '공연 시간을 입력해 주세요.' })
  times: Date[];

  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  seatsInfo: number;

  static toDto(data: any): CreateShowDto {
    return plainToClass(CreateShowDto, data);
  }
}
