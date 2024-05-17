import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'library',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BookModule,
    MemberModule,
    BorrowModule,
  ],
})
export class AppModule {}
