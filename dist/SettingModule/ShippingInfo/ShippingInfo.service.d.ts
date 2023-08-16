import { Model } from 'mongoose';
import { ShippingInfoDTO } from './dto/Shippinginfo.dto';
import { Shipping } from 'src/SellerModule/interfaces/shipping.interface';
export declare class ShippingInfoService {
    private readonly shippingModel;
    constructor(shippingModel: Model<Shipping>);
    createAddress(res: any, shippingDTO: ShippingInfoDTO): Promise<any>;
    updateAddress(res: any, address_id: any, shippingDTO: ShippingInfoDTO): Promise<Shipping>;
    deleteAddress(res: any, address_id: any): Promise<any>;
    getAddressByUserId(res: any, address_id: any): Promise<Shipping[]>;
    addressinfo(res: any, user_id: any): Promise<Shipping>;
}
