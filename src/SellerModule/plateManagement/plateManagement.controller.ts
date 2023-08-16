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
import { PlateManagementService } from 'src/SellerModule/plateManagement/plateMangement.service';
import { PlateManagementDTO } from 'src/SellerModule/plateManagement/plateManagement.dto';

@Controller('plates')
export class PlateManagementController {
  constructor(private plateManagementService: PlateManagementService) {}

  // add a plate
  @Post('/add_plate')
  async addPlate(@Res() res, @Body() plateManagementDTO: PlateManagementDTO) {
    await this.plateManagementService.addPlate(res, plateManagementDTO);
  }

  // Retrieve plate list
  @Get('/getAllPlates')
  async getAllPlates(@Res() res) {
    await this.plateManagementService.getAllPlates(res);
  }

  // Fetch a particular plate using ID
  @Get('plate/:plateID')
  async getPlate(@Res() res, @Param('plateID') plateID) {
    await this.plateManagementService.getPlate(res, plateID);
  }

  // Fetch a particular plate using userID
  @Get('/getPlatesByUserID/:user_id')
  async getPlatesByUserID(@Res() res, @Param('user_id') user_id) {
    await this.plateManagementService.getPlatesByUserID(res, user_id);
  }

  // edit place ask in plate
  @Put('/editAsk')
  async editAsk(
    @Res() res,
    @Query('plateID') plateID,
    @Body() plateManagementDTO: PlateManagementDTO,
  ) {
    await this.plateManagementService.editAsk(res, plateID, plateManagementDTO);
  }

  // show direct sell
  @Get('/sell_Pending')
  async pending(@Res() res, @Query('userID') userID) {
    await this.plateManagementService.sell_Pending(res, userID);
  }

  @Put('/editPlate')
  async editPlate(
    @Res() res,
    @Query('plateID') plateID,
    @Body() plateManagementDTO: PlateManagementDTO,
  ) {
    await this.plateManagementService.editPlate(
      res,
      plateID,
      plateManagementDTO,
    );
  }

  // Delete a plate
  @Delete('/delete')
  async deletePlate(@Res() res, @Query('plateID') plateID) {
    await this.plateManagementService.deletePlate(res, plateID);
  }

  @Get('/count_list')
  async GetAllPlates(@Res() res) {
    const users = await this.plateManagementService.GetAllPlates();
    const totalplates = await this.plateManagementService.countallplates(users);
    const onbid = await this.plateManagementService.getallbidcount(users);
    const onsell = await this.plateManagementService.getallsellcount(users);

    return res.status(HttpStatus.OK).json({ totalplates, onbid, onsell });
  }

  @Post('upload_image')
  async uploadFile(@Res() res, @Body() body) {
    await this.plateManagementService.uploadFile(res, body);
  }

  // get image
  @Get('uploads/plate/:filename')
  getProfileImage(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: 'uploads/plate' });
  }

  @Post('reUploadImage/:plateID')
  async reUploadImage(
    @Res() res,
    @Param('plateID') plateID,
    @Body() plateManagementDTO: PlateManagementDTO,
  ) {
    await this.plateManagementService.reUploadImage(
      res,
      plateID,
      plateManagementDTO,
    );
  }

  @Get('/getHighestBid/:plate_number')
  async getHighestBid(@Res() res, @Param('plate_number') plate_number) {
    await this.plateManagementService.getHighestBid(res, plate_number);
  }

  @Get('/staticPages')
  async staticPages(@Res() res) {
    await this.plateManagementService.staticPages(res);
  }

  // new

  // @Get('/getAllPlatesss')
  // async GetAllPlatesss(@Res() res) {
  //   await this.plateManagementService.GetAllPlatesss(res);
  // }

  // @Get('/getAllPlatess')
  // async getAllPlatess(@Res() res) {
  //   await this.plateManagementService.getAllPlatess(res);
  // }

  @Get('getAllPlatess')
  async getAllPlatess(@Res() res) {
    await this.plateManagementService.getAllPlatess(res);
  }
  // @Get('getResetMails')
  // async getResetMails(@Res() res) {
  //   await this.plateManagementService.getResetMails(res);
  // }
}
