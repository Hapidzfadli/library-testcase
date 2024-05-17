import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id: id });
  }

  async create(book: Book): Promise<Book> {
    return this.booksRepository.save(book);
  }

  async update(id: string, book: Book): Promise<void> {
    await this.booksRepository.update(id, book);
  }

  async remove(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
