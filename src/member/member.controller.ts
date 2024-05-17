import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './member.entity';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @Post()
  create(@Body() member: Member): Promise<Member> {
    return this.memberService.create(member);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() member: Member): Promise<void> {
    return this.memberService.update(id, member);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.memberService.remove(id);
  }
}
