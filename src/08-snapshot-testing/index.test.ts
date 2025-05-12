// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const expectedOutput = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    expect(generateLinkedList(input)).toStrictEqual(expectedOutput);
  });

  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3];

    expect(generateLinkedList(input)).toMatchSnapshot();
  });
});
