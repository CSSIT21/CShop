import { HttpException, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { v4 as uuid_gen } from 'uuid';

import { PrismaService } from 'src/prisma/prisma.service';
// import { mkdirSync } from 'fs';
// import { resizedDir } from 'src/common/constant/storage';
import { Prisma } from '.prisma/client';
// import { RegisterDto } from './dto/register.dts';
@Injectable()
export class AuthenticationService {
  constructor(private readonly prisma: PrismaService) {}

  public async register(data) {
    const { username, password, email, ...rest} = data;
    const uuid = uuid_gen();
    try{
      const user = await this.prisma.user.create({ 
        data: {
          username,
          password: hashSync(password,10),
        }
          /*
          uuid,
          email,
          role: 'USER',
          profile : {
            create: {
              ...rest
            }
          }
        }, 
        include: { profile: true}*/
      });
    }catch(e){

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        
        if (e.code === 'P2002')  throw new HttpException("A new user cannot be created with this email or username", 500);

        throw new HttpException("Error creating profile please check your information!", 500);
      }

      throw new HttpException("Error create profile request body incorrect", 500);
    }
    // mkdirSync(`storage/${uuid}`,{ recursive: true });
    // mkdirSync(`storage/${uuid}/${resizedDir}`,{ recursive: true });

    return 'Complete!';
  }

  public async findAll() {
    return this.prisma.user.findMany({
      where: { id: { not: 5 } },
      select: {
        id: true,
        username: true,
        type: true,
        created_at: true,
        updated_at: true,
      }
      // include: {
      //   profile: true
      // }
    });
  }

  public async update(id: number, updateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}