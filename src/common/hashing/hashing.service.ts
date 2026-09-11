import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  hash(text: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(text, salt);
  }
  async compare(plainText: string, hashedText: string) {
    return bcrypt.compare(plainText, hashedText);
  }
}
