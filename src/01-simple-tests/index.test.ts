import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(2 + 3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Subtract })).toBe(
      2 - 3,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toBe(
      2 * 3,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Divide })).toBe(2 / 3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      2 ** 3,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'Logarithm' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: '2', b: 'three', action: Action.Exponentiate }),
    ).toBeNull();
  });
});
