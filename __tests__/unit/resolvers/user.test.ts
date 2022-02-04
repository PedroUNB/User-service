import resolvers from '../../../src/app/graphql/resolvers/user';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import truncate from '../../utils/truncate';

describe('User resolvers', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('Should return a basic message from apollo server', () => {
    expect(resolvers.Query.userHelloWorld()).toEqual('Hello world from Apollo Server');
  });
});
