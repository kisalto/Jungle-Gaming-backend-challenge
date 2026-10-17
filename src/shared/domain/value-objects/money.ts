import Decimal from "decimal.js";
import { InvalidCurrencyError, InvalidMoneyAmountError, MoneyAmountOutOfRangeError, MoneyCurrencyMismatchError } from "../errors/money.errors";

export interface MoneyProps {
    amount: string,
    currency: string;
}

const MoneyDecimal = Decimal.clone ({
    precision: 40,
    rounding: Decimal.ROUND_HALF_EVEN,
    toExpNeg: -40,
    toExpPos: 40
})

const PATTERN = /^(0|[1-9]\d{0,17})\.\d{2}$/;
const CURRENCIES = new Set(['BRL', 'USD', 'EUR'])
const MAX_ABSOLUTE_AMOUNT = new MoneyDecimal('999999999999999999.99');

export class Money {
    private constructor(
        private readonly value: Decimal,
        public readonly currency: string,
    ) {
        Object.freeze(this);
    }
    
    public static from(props: MoneyProps): Money {
        Money.assertSupportedCurrency(props.currency);

        if (!PATTERN.test(props.amount)) {
            throw new InvalidMoneyAmountError();
        }

        return Money.fromResult(new MoneyDecimal(props.amount), props.currency);
    }

    public static zero(currency: string): Money {
        Money.assertSupportedCurrency(currency);

        return new Money(new MoneyDecimal('0.00'), currency);
    }

    public add(other: Money): Money {
        this.assertSameCurrency(other)

        return Money.fromResult(this.value.plus(other.value), this.currency)
    }

    public subtract(other: Money): Money {
        this.assertSameCurrency(other);

        return Money.fromResult(this.value.minus(other.value), this.currency);
    }

    public negate(): Money {
        return Money.fromResult(this.value.negated(), this.currency);
    }

    public isZero(): boolean {
        return this.value.isZero();
    }

    public isPositive(): boolean {
        return this.value.isPositive() && !this.value.isZero();
    }

    public isNegative(): boolean {
        return this.value.isNegative() && !this.value.isZero();
    }

    public isLessThan(other: Money): boolean {
        this.assertSameCurrency(other);

        return this.value.lessThan(other.value);
    }

    public equals(other: Money): boolean {
        this.assertSameCurrency(other);

        return this.value.equals(other.value);
    }

    public toString(): string {
        return this.value.toFixed(2);
    }

    public toJSON(): MoneyProps {
        return { amount: this.toString(), currency: this.currency };
    }

    private static assertSupportedCurrency(currency: string): void {
        if (!CURRENCIES.has(currency)) {
            throw new InvalidCurrencyError();
        }
    }

    private assertSameCurrency(other: Money): void {
        if (this.currency !== other.currency) {
            throw new MoneyCurrencyMismatchError(this.currency, other.currency);
        }
    }

    private static fromResult(value: Decimal, currency: string): Money {
        if (value.decimalPlaces() > 2) {
            throw new InvalidMoneyAmountError();
        }
    
        if (value.abs().greaterThan(MAX_ABSOLUTE_AMOUNT)) {
            throw new MoneyAmountOutOfRangeError();
        }
    
        // Normalizes -0 to 0 so toString() never prints "-0.00"
        const normalized = value.isZero() ? new MoneyDecimal(0) : value;
    
        return new Money(normalized, currency);
    }
}
