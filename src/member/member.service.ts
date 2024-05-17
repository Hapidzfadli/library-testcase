import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  findOne(id: number): Promise<Member> {
    return this.membersRepository.findOneBy({ id: id });
  }

  async create(member: Member): Promise<Member> {
    return this.membersRepository.save(member);
  }

  async update(id: string, member: Member): Promise<void> {
    await this.membersRepository.update(id, member);
  }

  async remove(id: string): Promise<void> {
    await this.membersRepository.delete(id);
  }
}
