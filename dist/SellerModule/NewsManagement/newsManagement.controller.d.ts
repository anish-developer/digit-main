import { NewsManagementservice } from './newsManagement.service';
import { NewsManagementDTO } from './newsManagement.dto';
export declare class NewsManagementController {
    private NewsManagementservice;
    constructor(NewsManagementservice: NewsManagementservice);
    createNews(res: any, NewsManagementDTO: NewsManagementDTO): Promise<void>;
    getAllNews(res: any): Promise<void>;
    getNewsbyId(res: any, newsID: any): Promise<void>;
    updateNews(res: any, newsID: any, NewsManagementDTO: NewsManagementDTO): Promise<void>;
    deleteNews(res: any, newsID: any): Promise<void>;
    getProfileImage(filename: any, res: any): any;
}
