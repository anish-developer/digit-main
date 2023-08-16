/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { News } from 'src/SellerModule/interfaces/news.interface';
import { NewsManagementDTO } from 'src/SellerModule/NewsManagement/newsManagement.dto';
import { CommonMethods } from 'src/utilities/common-methods';
const base64ToImage = require('base64-to-image');
const csvtojson = require('csvtojson');

@Injectable()
export class NewsManagementservice {
  constructor(
    @InjectModel('News') private readonly NewAndUpdateModel: Model<News>,
  ) {}
  // fetch all users
  async getAllNews(res: Response): Promise<News[]> {
    const users = await this.NewAndUpdateModel.find()
      .sort({ created_at: -1 })
      .exec();
    if (users.length) {
      return CommonMethods.success(
        res,
        'News List fetched successfully',
        users,
      );
    } else {
      return CommonMethods.error(res, 'No News exists');
    }
  }
  // Get a single user
  async getNewsbyId(res: Response, newsID): Promise<News> {
    const user = await this.NewAndUpdateModel.findById(newsID).exec();
    if (user) {
      return CommonMethods.success(res, 'Success', user);
    } else {
      return CommonMethods.error(res, 'News does not exists');
    }
  }
  // post a single User
  async createNews(res: Response, NewsManagementDTO: NewsManagementDTO) {
    const base64Str = NewsManagementDTO.image;
    const path = './uploads/news/';
    const optionalObj = {
      fileName: '',
      type: base64Str.split(';')[0].split('/')[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);

    const filePath = `http://${process.env.HOST}:${process.env.PORT}/newsManagement/uploads/news/${imageInfo.fileName}`;
    const newUser = new this.NewAndUpdateModel(NewsManagementDTO).$set({
      image: filePath,
    });
    if (newUser) {
      await newUser.save();
      return CommonMethods.success(res, 'News Created', newUser);
    } else {
      return CommonMethods.error(res, 'Already Exists');
    }
  }
  // Edit User details
  async updateNews(
    res: Response,
    newsID,
    NewsManagementDTO: NewsManagementDTO,
  ): Promise<News> {
    const editPlate = await this.NewAndUpdateModel.findByIdAndUpdate(
      newsID,
      NewsManagementDTO,
      { new: true },
    );
    if (editPlate) {
      return CommonMethods.success(res, 'News edited successfully', editPlate);
    } else {
      return CommonMethods.error(res, 'No news present');
    }
  }

  // Delete a User
  async deleteNews(res: Response, newsID): Promise<any> {
    const deletedUser = await this.NewAndUpdateModel.findOneAndDelete(newsID);
    if (deletedUser) {
      return CommonMethods.success(res, 'News Deleted successfully', []);
    } else {
      return CommonMethods.error(res, 'No News present');
    }
  }
}
