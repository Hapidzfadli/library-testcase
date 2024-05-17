import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';
import { Member } from 'src/member/member.entity';
import { Book } from 'src/book/book.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async borrowBook(memberId: number, bookId: number): Promise<Borrow> {
    const member = await this.memberRepository.findOne({
      where: { id: memberId },
    });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!member || !book) {
      throw new Error('Member or Book not found');
    }

    if (member.penalties > 0 && new Date() < member.penaltyExpiresAt) {
      throw new Error('Member is currently penalized');
    }

    const borrowedBooks = await this.borrowRepository.find({
      where: { member, returnedAt: null },
    });
    if (borrowedBooks.length >= 2) {
      throw new Error('Members cannot borrow more than 2 books');
    }

    const alreadyBorrowed = await this.borrowRepository.findOne({
      where: { book, returnedAt: null },
    });
    if (alreadyBorrowed) {
      throw new Error('Book is already borrowed by another member');
    }

    const borrowRecord = this.borrowRepository.create({ member, book });
    book.stock -= 1;
    await this.bookRepository.save(book);
    return this.borrowRepository.save(borrowRecord);
  }

  async returnBook(memberId: number, bookId: number): Promise<Borrow> {
    const member = await this.memberRepository.findOne({
      where: { id: memberId },
    });
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!member || !book) {
      throw new Error('Member or Book not found');
    }

    const borrowRecord = await this.borrowRepository.findOne({
      where: { member, book, returnedAt: null },
    });
    if (!borrowRecord) {
      throw new Error('This book is not borrowed by the member');
    }

    borrowRecord.returnedAt = new Date();
    const borrowDuration = Math.ceil(
      (borrowRecord.returnedAt.getTime() - borrowRecord.borrowedAt.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (borrowDuration > 7) {
      member.penalties += 1;
      member.penaltyExpiresAt = new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
      );
      await this.memberRepository.save(member);
    }

    book.stock += 1;
    await this.bookRepository.save(book);
    return this.borrowRepository.save(borrowRecord);
  }

  findAll(): Promise<Borrow[]> {
    return this.borrowRepository.find({ relations: ['member', 'book'] });
  }

  findOne(id: number): Promise<Borrow> {
    return this.borrowRepository.findOne({
      where: { id },
      relations: ['member', 'book'],
    });
  }
}
