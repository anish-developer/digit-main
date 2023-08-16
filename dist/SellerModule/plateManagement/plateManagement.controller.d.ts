import { PlateManagementService } from 'src/SellerModule/plateManagement/plateMangement.service';
import { PlateManagementDTO } from 'src/SellerModule/plateManagement/plateManagement.dto';
export declare class PlateManagementController {
    private plateManagementService;
    constructor(plateManagementService: PlateManagementService);
    addPlate(res: any, plateManagementDTO: PlateManagementDTO): Promise<void>;
    getAllPlates(res: any): Promise<void>;
    getPlate(res: any, plateID: any): Promise<void>;
    getPlatesByUserID(res: any, user_id: any): Promise<void>;
    editAsk(res: any, plateID: any, plateManagementDTO: PlateManagementDTO): Promise<void>;
    pending(res: any, userID: any): Promise<void>;
    editPlate(res: any, plateID: any, plateManagementDTO: PlateManagementDTO): Promise<void>;
    deletePlate(res: any, plateID: any): Promise<void>;
    GetAllPlates(res: any): Promise<any>;
    uploadFile(res: any, body: any): Promise<void>;
    getProfileImage(filename: any, res: any): any;
    reUploadImage(res: any, plateID: any, plateManagementDTO: PlateManagementDTO): Promise<void>;
    getHighestBid(res: any, plate_number: any): Promise<void>;
    staticPages(res: any): Promise<void>;
    getAllPlatess(res: any): Promise<void>;
}
