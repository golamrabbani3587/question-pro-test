import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users/by-position?positionId=1 (GET)', async () => {
    const positionId = 1;
    const response = await request(app.getHttpServer())
      .get(`/users/by-position?positionId=${positionId}`)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/users (GET) - Array Response', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
