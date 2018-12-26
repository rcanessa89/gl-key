import { Controller } from '@nestjs/common';

import { Entry } from '@entities/entry.entity';
import { baseControllerFactory } from '@base/base.controller';
import { EntryService } from './entry.service';
import { EntryVM } from './entry.vm';

const BaseController = baseControllerFactory<Entry, EntryVM>({
  entity: Entry,
  entityVm: EntryVM,
  auth: false,
});

@Controller('entry')
export class EntryController extends BaseController {
  constructor(
    private readonly entryService: EntryService,
  ) {
    super(entryService);
  }
}
