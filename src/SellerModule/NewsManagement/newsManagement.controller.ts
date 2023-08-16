import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { CommonMethods } from 'src/utilities/common-methods';
import { NewsManagementservice } from './newsManagement.service';
import { NewsManagementDTO } from './newsManagement.dto';

@Controller('newsManagement')
export class NewsManagementController {
  constructor(private NewsManagementservice: NewsManagementservice) {}

  // add a plate
  // add a customer
  @Post('/news_create')
  async createNews(@Res() res, @Body() NewsManagementDTO: NewsManagementDTO) {
    await this.NewsManagementservice.createNews(res, NewsManagementDTO);
  }

  // Retrieve customers list
  @Get('/news_list')
  async getAllNews(@Res() res) {
    await this.NewsManagementservice.getAllNews(res);
  }

  // Fetch a particular customer using ID
  @Get('news/:newsID')
  async getNewsbyId(@Res() res, @Param('newsID') newsID) {
    await this.NewsManagementservice.getNewsbyId(res, newsID);
  }

  @Put('/news_update')
  async updateNews(
    @Res() res,
    @Query('newsID') newsID,
    @Body() NewsManagementDTO: NewsManagementDTO,
  ) {
    await this.NewsManagementservice.updateNews(res, newsID, NewsManagementDTO);
  }

  // Delete a customer
  @Delete('/news_delete')
  async deleteNews(@Res() res, @Query('newsID') newsID) {
    await this.NewsManagementservice.deleteNews(res, newsID);
  }

  // get image
  @Get('uploads/news/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/news' });
  }
}
