import { ShippingInfoService } from 'src/SettingModule/ShippingInfo/ShippingInfo.service';
import { ShippingInfoDTO } from './dto/Shippinginfo.dto';
export declare class ShippingInfoController {
    private ShippingInfoService;
    constructor(ShippingInfoService: ShippingInfoService);
    createNews(res: any, shippingDTO: ShippingInfoDTO): Promise<void>;
    updateAddress(res: any, address_id: any, shippingDTO: ShippingInfoDTO): Promise<void>;
    deleteAddress(res: any, address_id: any): Promise<void>;
    getAddressByUserId(res: any, address_id: any): Promise<import("../../SellerModule/interfaces/shipping.interface").Shipping[]>;
    getPayment(res: any, user_id: any): Promise<void>;
}
