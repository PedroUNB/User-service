import request from 'supertest';
import app from '../../src/config/app';
import { sequelize } from '../../src/db/sequelize';

describe('Get Endpoints', () => {
  it('Shoud return status code 200 when get path / ', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('Shoud return status code 200 when execute query userHelloWorld ', async () => {
    const res = await request(app).post('/graphql').send({
      query: 'query { userHelloWorld }'
    });

    expect(res.statusCode).toEqual(200);
  });
});

beforeAll(() => {
  sequelize.close();
});
