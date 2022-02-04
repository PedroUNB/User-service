import request from 'supertest';
import app from '../../../src/config/app';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import truncate from '../../utils/truncate';

describe('User Resolvers', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should create a user with sucess', async () => {
    const res = await request(app).post('/graphql').send({
      query: 'mutation createUser {\n' +
        '  createUser(createUserInput: {\n' +
        '    name: "Pedro"\n' +
        '  }) {\n' +
        '    id\n' +
        '    name\n' +
        '    createdAt\n' +
        '    updatedAt\n' +
        '    removedAt\n' +
        '  }\n' +
        '}'
    });

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('createUser');
    expect(res.body.data.createUser).toHaveProperty('id');
  });

  it('Should return an array of users', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query:
          'query getUserList {\n' +
          '  getUserList {\n' +
          '    totalCount\n' +
          '    data {\n' +
          '      id\n' +
          '      createdAt\n' +
          '      updatedAt\n' +
          '      removedAt\n' +
          '    }\n' +
          '  }\n' +
          '}'
      });

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('getUserList');
  });

  it('Should get a list of users from db', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query:
          'query getUserList {\n' +
          '  getUserList {\n' +
          '    totalCount\n' +
          '    data {\n' +
          '      id\n' +
          '      name\n' +
          '      createdAt\n' +
          '      updatedAt\n' +
          '      removedAt\n' +
          '    }\n' +
          '  }\n' +
          '}'
      });

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('getUserList');
  });

  it('Should update a user with sucess', async () => {
    const user = await request(app).post('/graphql').send({
      query: 'mutation createUser {\n' +
        '  createUser(createUserInput: {\n' +
        '    name: "Pedro"\n' +
        '  }) {\n' +
        '    id\n' +
        '    name\n' +
        '    createdAt\n' +
        '    updatedAt\n' +
        '    removedAt\n' +
        '  }\n' +
        '}'
    });

    const res = await request(app).post('/graphql').send({
      query: 'mutation updateUser {\n' +
        '  updateUser(\n' +
        '    userId: ' + `"${user.body.data.createUser.id}"` + '\n' +
        '    updateUserInput: { name: "Henrique" }\n' +
        '  ) {\n' +
        '    id\n' +
        '    name\n' +
        '    createdAt\n' +
        '    updatedAt\n' +
        '    removedAt\n' +
        '  }\n' +
        '}'
    });

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('updateUser');
    expect(res.body.data.updateUser).toHaveProperty('name');
    expect(res.body.data.updateUser.name).toBe('Henrique');
  });

  it('Should remove a user with sucess', async () => {
    const user = await request(app).post('/graphql').send({
      query: 'mutation createUser {\n' +
        '  createUser(createUserInput: {\n' +
        '    name: "Pedro"\n' +
        '  }) {\n' +
        '    id\n' +
        '    name\n' +
        '    createdAt\n' +
        '    updatedAt\n' +
        '    removedAt\n' +
        '  }\n' +
        '}'
    });

    const res = await request(app).post('/graphql').send({
      query: 'mutation removeUser {\n' +
        '  removeUser(userId: ' + `"${user.body.data.createUser.id}"` + ') {\n' +
        '    id\n' +
        '    createdAt\n' +
        '    updatedAt\n' +
        '    removedAt\n' +
        '  }\n' +
        '}'
    });

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('removeUser');
    expect(res.body.data.removeUser).toHaveProperty('id');
  });

  it('Shouldnt get a user how not exists on database', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query:
          'query getUserById {\n' +
          '  getUserById(userId: "00000000-f12c-4c90-90d4-f62faebedc8b") {\n' +
          '    id\n' +
          '    createdAt\n' +
          '    updatedAt\n' +
          '    removedAt\n' +
          '  }\n' +
          '}'
      });

    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[0]).toHaveProperty('message');
  });

  it('Shouldnt update a user how not exists on database', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query:
          'mutation updateUser {\n' +
          '  updateUser(\n' +
          '    userId: "9fdc5d87-6e40-48a8-b0ba-af0baf15cc40"\n' +
          '    updateUserInput: { name: "Henrique" }\n' +
          '  ) {\n' +
          '    id\n' +
          '    name\n' +
          '    createdAt\n' +
          '    updatedAt\n' +
          '    removedAt\n' +
          '  }\n' +
          '}'
      });

    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[0]).toHaveProperty('message');
  });
});
