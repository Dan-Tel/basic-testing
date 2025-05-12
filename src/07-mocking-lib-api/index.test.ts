const createMock = jest.fn();
const getMock = jest.fn();
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  create: createMock,
}));

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.unmock('axios');
  });

  test('should create instance with provided base url', async () => {
    const expectedData = { message: 'Success' };
    const expectedRelativePath = '/test';

    createMock.mockReturnValue({
      get: getMock.mockResolvedValue({ data: expectedData }),
    });

    await throttledGetDataFromApi(expectedRelativePath);
    jest.advanceTimersByTime(5000);

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenLastCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const expectedData = { message: 'Success' };
    const expectedRelativePath = '/test';

    createMock.mockReturnValue({
      get: getMock.mockResolvedValue({ data: expectedData }),
    });

    await throttledGetDataFromApi(expectedRelativePath);
    jest.advanceTimersByTime(5000);

    expect(getMock).toHaveBeenCalledWith(expectedRelativePath);
  });

  test('should return response data', async () => {
    const expectedData = { message: 'Success' };
    const expectedRelativePath = '/test';

    createMock.mockReturnValue({
      get: getMock.mockResolvedValue({ data: expectedData }),
    });

    const result = await throttledGetDataFromApi(expectedRelativePath);

    expect(result).toBe(expectedData);
  });
});
