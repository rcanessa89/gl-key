import { ApiModelProperty } from '@nestjs/swagger';

import { BaseVM } from '@base/base.vm';

export class EntryVM extends BaseVM {
  @ApiModelProperty()
  cedula: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  firstLastName: string;

  @ApiModelProperty()
  secondLastName: string;

  @ApiModelProperty()
  checkIn: string;

  @ApiModelProperty()
  checkOut?: string;
}
