import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy, Global } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(){
    super({ log: ['info'] });
  }

  async onModuleInit() {
    await this.$connect();
  }
  
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });    
  }
}