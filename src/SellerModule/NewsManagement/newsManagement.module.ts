import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsScheema } from '../models/news.schema';
import { NewsManagementController } from '../NewsManagement/newsManagement.controller';
import { NewsManagementservice } from '../NewsManagement/newsManagement.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'News', schema: NewsScheema }])],
  providers: [NewsManagementservice],
  controllers: [NewsManagementController],
  exports: [],
})
export class NewsModule {}
