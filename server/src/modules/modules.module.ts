import { Module } from '@nestjs/common';
import { EntryModule } from './entry/entry.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [
    EntryModule,
    AssetModule
  ],
})
export class ModulesModule {}
