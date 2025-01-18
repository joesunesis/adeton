export type Order = {
  orderId: string,
  price: number,
  quantity: number,
  totalCost: number,
  item: string,
  user: string,
  profit: number,
  orderStatus: string,
  paymentStatus: string,
  orderDate: string,
  orderCode: string
}