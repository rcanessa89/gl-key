import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@base/base.service';
import { Entry } from '@entities/entry.entity';

@Injectable()
export class EntryService extends BaseService<Entry> {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {
    super(entryRepository);
  }
}
