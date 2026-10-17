import { describe, expect, it } from 'bun:test';

import { Money } from './money';
import {
  InvalidCurrencyError,
  InvalidMoneyAmountError,
  MoneyAmountOutOfRangeError,
  MoneyCurrencyMismatchError,
} from '../errors/money.errors';

// Small helper so each test stays readable
const brl = (amount: string): Money => Money.from({ amount, currency: 'BRL' });

describe('Money', () => {
  describe('from', () => {
    it('accepts a canonical two-decimal amount', () => {
      expect(brl('25.00').toString()).toBe('25.00');
    });

    // it.each runs the same test once for each value in the list
    it.each(['', '25', '25.5', '25.001', '-1.00', '01.00', '1e3', 'NaN', 'Infinity', ' 25.00'])(
      'rejects invalid amount "%s"',
      (amount) => {
        expect(() => brl(amount)).toThrow(InvalidMoneyAmountError);
      },
    );
  });

  describe('arithmetic', () => {
    it('adds without floating point error', () => {
      expect(brl('0.10').add(brl('0.20')).toString()).toBe('0.30');
    });
  });
});