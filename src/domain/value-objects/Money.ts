export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'COP'
  ) {
    if (amount < 0) {
      throw new Error('Money amount cannot be negative');
    }
  }

  format(): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount);
  }

  formatShort(): string {
    if (this.amount >= 1000000000) {
      return `$${(this.amount / 1000000000).toFixed(1)}B`;
    }
    if (this.amount >= 1000000) {
      return `$${(this.amount / 1000000).toFixed(1)}M`;
    }
    if (this.amount >= 1000) {
      return `$${(this.amount / 1000).toFixed(0)}K`;
    }
    return this.format();
  }

  add(other: Money): Money {
    if (other.currency !== this.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    if (other.currency !== this.currency) {
      throw new Error('Cannot subtract money with different currencies');
    }
    return new Money(this.amount - other.amount, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
