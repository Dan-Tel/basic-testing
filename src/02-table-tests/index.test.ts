import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 3, action: Action.Add, expected: 2 + 3 },
  { a: 2, b: 3, action: Action.Subtract, expected: 2 - 3 },
  { a: 2, b: 3, action: Action.Multiply, expected: 2 * 3 },
  { a: 2, b: 3, action: Action.Divide, expected: 2 / 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 2 ** 3 },
  { a: 2, b: 3, action: 'Logarithm', expected: null },
  { a: '2', b: 'three', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly perform $action operation on $a and $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
