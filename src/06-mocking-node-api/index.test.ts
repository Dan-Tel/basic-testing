const existsSyncMock = jest.fn();
const readFileMock = jest.fn();
const joinMock = jest.fn();

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

jest.mock('fs', () => ({
  existsSync: existsSyncMock,
}));

jest.mock('fs/promises', () => ({
  readFile: readFileMock,
}));

jest.mock('path', () => ({
  join: joinMock,
}));

describe('doStuffByTimeout', () => {
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    setTimeoutSpy.mockReset();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const delay = 1000;

    doStuffByTimeout(callbackMock, delay);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callbackMock, delay);
  });

  test('should call callback only after timeout', () => {
    const callbackMock = jest.fn();
    const delay = 1000;

    doStuffByTimeout(callbackMock, delay);

    expect(callbackMock).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let setIntervalSpy: jest.SpyInstance;

  beforeEach(() => {
    setIntervalSpy = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    setIntervalSpy.mockReset();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const delay = 1000;

    doStuffByInterval(callbackMock, delay);

    expect(setIntervalSpy).toHaveBeenCalledWith(callbackMock, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackMock = jest.fn();
    const delay = 1000;
    const repeat = 3;

    doStuffByInterval(callbackMock, delay);

    for (let i = 1; i <= repeat; i++) {
      jest.advanceTimersByTime(delay);
      expect(callbackMock).toHaveBeenCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  afterAll(() => {
    jest.unmock('fs');
    jest.unmock('fs/promises');
    jest.unmock('path');
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = '/test';

    await readFileAsynchronously(pathToFile);

    expect(joinMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = '/test';

    existsSyncMock.mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = '/test';
    const expectedContent = 'mocked file content';

    existsSyncMock.mockReturnValue(true);
    readFileMock.mockResolvedValue(expectedContent);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(expectedContent);
  });
});
