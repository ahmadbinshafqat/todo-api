import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Tasks (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({
        name: 'Test Task',
        dueDate: '2025-01-16',
        priority: 'Blue',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({
          name: 'Test Task',
          dueDate: '2025-01-16',
          priority: 'Blue',
        });
      });
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect((res) => {
        // Check if the response body contains 'data' and 'pagination' properties
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('pagination');
  
        // Validate that 'data' is an array
        expect(Array.isArray(res.body.data)).toBeTruthy();
  
        // Validate that 'pagination' has the correct properties
        expect(res.body.pagination).toHaveProperty('currentPage');
        expect(res.body.pagination).toHaveProperty('pageSize');
        expect(res.body.pagination).toHaveProperty('totalCount');
        expect(res.body.pagination).toHaveProperty('totalPages');
      });
  });
  

  afterAll(async () => {
    await app.close();
  });
});
