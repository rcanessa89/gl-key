import { Controller } from '@nestjs/common';

import { Asset } from '@entities/asset.entity';
import { baseControllerFactory } from '@base/base.controller';
import { AssetService } from './asset.service';
import { AssetVM } from './asset.vm';

const BaseController = baseControllerFactory<Asset, AssetVM>({
  entity: Asset,
  entityVm: AssetVM,
  auth: false,
});

@Controller('asset')
export class AssetController extends BaseController {
    constructor(
        private readonly entryService: AssetService,
    ) {
        super(entryService);
    }
}
