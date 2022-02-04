import {notExistsOrError} from '../../../src/app/helpers/validators';

describe('NotExistsOrError Validators', () => {
  it('should return err if a number value is passed', () => {
    const testVariable = () => {
      notExistsOrError(1, 'error');
    };
    expect(testVariable).toThrow('error');
  });

  it('should return err if a string value is passed', () => {
    const testVariable = () => {
      notExistsOrError('test', 'error');
    };
    expect(testVariable).toThrow('error');
  });

  it('should return err if a true value is passed', () => {
    const testVariable = () => {
      notExistsOrError(true, 'error');
    };
    expect(testVariable).toThrow('error');
  });

  it('should return err if a object value is passed', () => {
    const testVariable = () => {
      notExistsOrError({name: 'test'}, 'error');
    };
    expect(testVariable).toThrow('error');
  });

  it('should return err if a full array value is passed', () => {
    const testVariable = () => {
      notExistsOrError([1,2,3], 'error');
    };
    expect(testVariable).toThrow('error');
  });
});
