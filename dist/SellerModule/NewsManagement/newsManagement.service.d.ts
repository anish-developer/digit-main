import { Model } from 'mongoose';
import { News } from 'src/SellerModule/interfaces/news.interface';
import { NewsManagementDTO } from 'src/SellerModule/NewsManagement/newsManagement.dto';
export declare class NewsManagementservice {
    private readonly NewAndUpdateModel;
    constructor(NewAndUpdateModel: Model<News>);
    getAllNews(res: Response): Promise<News[]>;
    getNewsbyId(res: Response, newsID: any): Promise<News>;
    createNews(res: Response, NewsManagementDTO: NewsManagementDTO): Promise<any>;
    updateNews(res: Response, newsID: any, NewsManagementDTO: NewsManagementDTO): Promise<News>;
    deleteNews(res: Response, newsID: any): Promise<any>;
}
