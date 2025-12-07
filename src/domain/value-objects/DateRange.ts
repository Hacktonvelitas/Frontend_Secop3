export class DateRange {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {
    if (startDate > endDate) {
      throw new Error('Start date cannot be after end date');
    }
  }

  contains(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  daysRemaining(): number {
    const now = new Date();
    if (now > this.endDate) return 0;

    const diff = this.endDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  isExpired(): boolean {
    return new Date() > this.endDate;
  }

  overlaps(other: DateRange): boolean {
    return (
      this.contains(other.startDate) ||
      this.contains(other.endDate) ||
      other.contains(this.startDate)
    );
  }

  toString(): string {
    return `${this.startDate.toLocaleDateString('es-CO')} - ${this.endDate.toLocaleDateString('es-CO')}`;
  }
}
