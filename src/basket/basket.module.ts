import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';

import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [forwardRef(() => ShopModule)],
  providers: [BasketService],
  controllers: [BasketController],
  exports: [BasketService]
})
export class BasketModule {}
