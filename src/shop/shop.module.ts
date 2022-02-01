import { forwardRef, Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
 
import { BasketModule } from 'src/basket/basket.module';

@Module({
  imports:[forwardRef(() => BasketModule)],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService]
})
export class ShopModule {}
