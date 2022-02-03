import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';

import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => ShopModule)
    , forwardRef(() => UserModule)
  ],
  providers: [BasketService],
  controllers: [BasketController],
  exports: [BasketService]
})
export class BasketModule {}
