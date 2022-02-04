// eslint-disable-next-line @typescript-eslint/no-var-requires
const { development } = require('../../src/config/database');

describe('Database parameters', () => {
  it('Should the dialect from db has to be sqlite on tests', () => {
    expect(development.dialect).toEqual('sqlite');
  });

  it('Should the max connection pool greater or Equal than 50', () => {
    expect(development.pool.max).toBeGreaterThanOrEqual(50);
  });
});
