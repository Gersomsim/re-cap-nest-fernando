export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description?: string,
  ) {}

  updateWith(name?: string, price?: number, description?: string) {
    this.name = name ?? this.name;
    this.price = price ?? this.price;
    this.description = description ?? this.description;
  }
}
