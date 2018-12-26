import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@base/base.service';
import { Asset } from '@entities/asset.entity';

@Injectable()
export class AssetService extends BaseService<Asset> {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {
    super(assetRepository);
  }
}
