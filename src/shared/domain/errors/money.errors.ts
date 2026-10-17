// Domain errors raised by the Money value object
export class InvalidCurrencyError extends Error {
    public readonly code = 'INVALID_CURRENCY'

    public constructor() {
        super('Currency not supported')
    }
}

export class InvalidMoneyAmountError extends Error {
    public readonly code = 'INVALID_AMOUNT'

    public constructor() {
        super('Invalid Amount')
    }
}

export class MoneyCurrencyMismatchError extends Error {
    public readonly code = 'CURRENCY_MISMATCH'

    public constructor(expected: string, received: string) {
        super(`Currency mismatch: expected ${expected}, received ${received}`)
    }
}

export class MoneyAmountOutOfRangeError extends Error {
    public readonly code = 'AMOUNT_OUT_OF_RANGE'

    public constructor() {
        super('Amount out of range')
    }
}