import { Module } from '@nestjs/common';
import { IntroPageService } from './intro-page.service';
import { IntroPageController } from './intro-page.controller';

@Module({
  controllers: [IntroPageController],
  providers: [IntroPageService],
})
export class IntroPageModule {}
