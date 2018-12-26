import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

import { BaseEntity } from '@modules/base/base.entity';
import { Entry } from './entry.entity';

@Entity()
export class Asset extends BaseEntity {
  constructor(asset: Partial<Asset> = {}) {
    super();

    Object.assign(this, asset);
  }

  @Column()
  @ApiModelProperty()
  description: string;

  @Column()
  @ApiModelProperty()
  model: string;

  @Column()
  @ApiModelProperty()
  brand: string;

  @Column()
  @ApiModelProperty()
  series: string;

  @ManyToOne(type => Entry, entry => entry.assets, { onDelete:'CASCADE' })
  entry: Entry;
}
