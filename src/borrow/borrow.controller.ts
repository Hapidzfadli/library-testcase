import { Controller, Post, Param, Get } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { Borrow } from './borrow.entity';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post(':memberId/:bookId')
  async borrowBook(
    @Param('memberId') memberId: number,
    @Param('bookId') bookId: number,
  ): Promise<Borrow> {
    return this.borrowService.borrowBook(memberId, bookId);
  }

  @Post('return/:memberId/:bookId')
  async returnBook(
    @Param('memberId') memberId: number,
    @Param('bookId') bookId: number,
  ): Promise<Borrow> {
    return this.borrowService.returnBook(memberId, bookId);
  }

  @Get()
  findAll(): Promise<Borrow[]> {
    return this.borrowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Borrow> {
    return this.borrowService.findOne(id);
  }
}
