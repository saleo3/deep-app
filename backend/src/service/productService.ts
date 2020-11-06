import { InjectRepository } from 'typeorm-typedi-extensions';

import { Repository } from 'typeorm';
import { Inject, Service } from 'typedi';

import { Product as ProductEntity } from '../database/entity/product';
import { ProductOrder as ProductOrdersEntity } from '../database/entity/productOrders';
@Service('productService')
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductOrdersEntity)
    private readonly productOrderRepository: Repository<ProductOrdersEntity>
  ) {}

  public async getProducts() {
    return await this.productRepository.find();
  }

  public async createOrders(order: any) {
    let newOrder: any = await this.productOrderRepository.save(order);
    return await this.productOrderRepository.findOneOrFail({
      where: { id: newOrder.id },
      relations: ['product'],
    });
  }

  public async getOrders() {
    return await this.productOrderRepository.find({ relations: ['product'] });
  }

  public async deleteOrder(orderId: number) {
    await this.productOrderRepository.delete(orderId);
    return true;
  }

  public async updateOrder(order: any) {
    let orderToUpdate: any;
    try {
      await this.productOrderRepository
        .createQueryBuilder()
        .update(ProductOrdersEntity)
        .set({ ...order })
        .where('id=:id', { id: order.id })
        .execute();
      orderToUpdate = await this.productOrderRepository.findOne({
        where: { id: order.id },
        relations: ['product'],
      });
      console.log(orderToUpdate, order.id);
    } catch (error) {
      throw new Error('Not Found');
    }

    if (!orderToUpdate) {
      throw new Error('This order does not exist');
    }

    return orderToUpdate;
  }
}
