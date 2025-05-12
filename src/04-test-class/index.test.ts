const randomMock = jest.fn();

import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: randomMock,
}));

describe('BankAccount', () => {
  afterAll(() => {
    jest.unmock('lodash');
  });

  test('should create account with initial balance', () => {
    const initialBalance = 100;

    const bankAccount = getBankAccount(initialBalance);

    expect(bankAccount instanceof BankAccount).toBe(true);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawAmount = 101;

    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.withdraw(withdrawAmount)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const initialBalanceDest = 90;
    const transferAmount = 101;

    const bankAccount = getBankAccount(initialBalance);
    const bankAccountDest = getBankAccount(initialBalanceDest);

    expect(() => bankAccount.transfer(transferAmount, bankAccountDest)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 90;

    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.transfer(transferAmount, bankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 10;
    const expectedBalance = initialBalance + depositAmount;

    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(depositAmount);

    expect(bankAccount.getBalance()).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 10;
    const expectedBalance = initialBalance - withdrawAmount;

    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(withdrawAmount);

    expect(bankAccount.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const initialBalanceDest = 90;
    const transferAmount = 80;

    const expectedBalance = initialBalance - transferAmount;
    const expectedBalanceDest = initialBalanceDest + transferAmount;

    const bankAccount = getBankAccount(initialBalance);
    const bankAccountDest = getBankAccount(initialBalanceDest);
    bankAccount.transfer(transferAmount, bankAccountDest);

    expect(bankAccount.getBalance()).toBe(expectedBalance);
    expect(bankAccountDest.getBalance()).toBe(expectedBalanceDest);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomValue = 1;
    randomMock.mockReturnValue(randomValue);

    const initialBalance = 0;
    const bankAccount = getBankAccount(initialBalance);

    const result = await bankAccount.fetchBalance();

    expect(typeof result).toBe('number');
    expect(result).toBe(randomValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const randomValue = 1;
    randomMock.mockReturnValue(1);

    const initialBalance = 0;
    const bankAccount = getBankAccount(initialBalance);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(randomValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const randomValue = 0;
    randomMock.mockReturnValue(randomValue);

    const initialBalance = 0;
    const bankAccount = getBankAccount(initialBalance);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
