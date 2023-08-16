/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Payload } from 'src/SellerModule/interfaces/payload.interface';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/SellerModule/auth/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
