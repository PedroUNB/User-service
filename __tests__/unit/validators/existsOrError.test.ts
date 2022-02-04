import {existsOrError} from '../../../src/app/helpers/validators';

describe('ExistsOrError Validators', () => {
  it('should return err if null value is passed', () => {
    const testVariable = () => {
      existsOrError(null, 'error');
    };
    expect(testVariable).toThrow('error');
  });

  it('should return err if undefined value is passed', () => {
    const testVariable = () => {
      existsOrError(undefined, 'error');
    };
    expect(testVariable).toThrow('error');
  });

  it('should return err if a void array is passed', () => {
    const testVariable = () => {
      existsOrError([], 'error');
    };
    expect(testVariable).toThrow('error');
  });

  it('should return err if a void string is passed', () => {
    const testVariable = () => {
      existsOrError('', 'error');
    };
    expect(testVariable).toThrow('error');
  });

  it('should return err if a string with space is passed', () => {
    const testVariable = () => {
      existsOrError(' ', 'error');
    };
    expect(testVariable).toThrow('error');
  });
});
