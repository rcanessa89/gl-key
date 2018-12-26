import { ApiModelProperty } from '@nestjs/swagger';

import { BaseVM } from '@base/base.vm';
import { Entry } from '@entities/entry.entity';

export class AssetVM extends BaseVM {
  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  model: string;

  @ApiModelProperty()
  brand: string;

  @ApiModelProperty()
  series: string;

  @ApiModelProperty()
  entry: Entry;
}
