import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'JK-45', description: 'The code of the book' })
  code: string;

  @ApiProperty({
    example: 'Harry Potter',
    description: 'The title of the book',
  })
  title: string;

  @ApiProperty({
    example: 'J.K Rowling',
    description: 'The author of the book',
  })
  author: string;

  @ApiProperty({ example: 1, description: 'The stock of the book' })
  stock: number;
}
