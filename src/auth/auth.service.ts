import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    readonly userService: UsersService,
    readonly hashService: HashingService,
  ) {}

  async register(registerUserDto: RegisterDto) {
    this.logger.verbose(
      `Registrando ususario: ${JSON.stringify(registerUserDto)}`,
    );
    const user = await this.userService.findOneByEmail(registerUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const newUser = new User();
    newUser.name = registerUserDto.name;
    newUser.email = registerUserDto.email;
    newUser.password =await this.hashService.hash(registerUserDto.password);
    return this.userService.create(newUser);
  }

  async login({ password, email }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Email or password incorrect');
    }
    const isValid = await this.hashService.compare(password,user.password)
    if(!isValid) throw new BadRequestException('Email or password incorrect')
    return "Successful login"
  }
}
