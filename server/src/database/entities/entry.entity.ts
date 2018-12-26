import { Column, Entity, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

import { BaseEntity } from '@modules/base/base.entity';
import { Asset } from './asset.entity';

@Entity()
export class Entry extends BaseEntity {
  constructor(entry: Partial<Entry> = {}) {
    super();

    Object.assign(this, entry);
  }

  @Column()
  @ApiModelProperty()
  cedula: number;

  @Column()
  @ApiModelProperty()
  name: string;

  @Column()
  @ApiModelProperty()
  firstLastName: string;

  @Column()
  @ApiModelProperty()
  secondLastName: string;

  @Column()
  @ApiModelProperty()
  checkIn: Date;

  @Column({
    nullable: true
  })
  @ApiModelProperty()
  checkOut?: Date;

  @Column({
    type: 'blob',
    nullable: true
  })
  @ApiModelProperty()
  signature;

  @OneToMany(type => Asset, asset => asset.entry)
  assets: Asset[];
}
