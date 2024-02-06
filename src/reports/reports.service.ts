import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/order/schemas/order_schema';
import { Item, ItemDocument } from 'src/item/schemas/item-schema';
import { User, UserDocument } from 'src/user/schemas/user_schema';
import { Shop, ShopDocument } from 'src/shop/schemas/shop_schema';
import moment from 'moment';
import { Reports, ReportsDocument } from './schemas/reports_schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Reports.name) private readonly reportsModel: Model<ReportsDocument>,
    @InjectModel(Shop.name) private readonly shopModel: Model<ShopDocument>,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async findOne(id: string, report: string, year?: string, month?: string) {
    const user = await this.userModel.findById(id).catch(err => {
      console.log(err)
      throw new InternalServerErrorException(err)
    })
    if (user.role != 'shop_owner' || !user) throw new UnauthorizedException("Invalid user")
    const shopId = user.shop
    switch (report) {
      case "monthlySales":
        const reportYear = parseInt(year)
        const reportMonth = parseInt(month)
        return this.generateMonthlySalesReport(shopId, reportYear, reportMonth)
      case "itemSales":
        return this.generateItemSalesReport(shopId)
      case "itemRatings":
        return this.getShopItemRatings(shopId)
      case "orderMetrics":
        return this.getShopOrdersMetrics(shopId)
    }
  }

  async remove(id: string) {
    try {
      await this.reportsModel.findByIdAndDelete(id).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('Unexpected error happened while removing the report!')
      })
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    };
  }

  async generateMonthlySalesReport(
    shopId: string,
    year: number,
    month: number,
  ): Promise<Map<string, number>> {
    const monthlySales = await this.orderModel.aggregate([
      {
        $match: {
          shopID: shopId,
          createdAt: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
          },
        },
      },
      {
        $group: {
          _id: '$items.itemID',
          totalSales: { $sum: '$items.price' },
        },
      },
    ]).catch(err => {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error happened when aggregating!')
    });

    const result = new Map<string, number>();

    monthlySales.forEach(
      (entry: { _id: string; totalSales: number }) => {
        result.set(entry._id, entry.totalSales);
      },
    );

    return result;
  }

  async generateItemSalesReport(shopId: string): Promise<Map<string, number>> {
    const itemSales = await this.orderModel.aggregate([
      {
        $match: { shopID: shopId },
      },
      {
        $unwind: '$items',
      },
      {
        $group: {
          _id: '$items.itemID',
          totalSales: { $sum: '$items.price' },
        },
      },
    ]).catch(err => {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error happened while aggregating!')
    });

    const result = new Map<string, number>();

    itemSales.forEach(
      (entry: { _id: string; totalSales: number }) => {
        result.set(entry._id, entry.totalSales);
      },
    );

    return result;
  }

  async getShopItemRatings(shopId: string): Promise<Map<number, number>> {
    const shop = await this.shopModel.findById(shopId).exec().catch(err => {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error happened while finding the shop!')
    });

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    const items = await this.itemModel.find({ _id: { $in: shop.itemsIDs } }).exec().catch(err => {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error happened while finding the items!')
    });

    const ratingsMap = new Map<number, number>();

    items.forEach((item) => {
      const rating = item.rating || 0;
      ratingsMap.set(rating, (ratingsMap.get(rating) || 0) + 1);
    });

    return ratingsMap;
  }

  async getShopCustomerCount(shopId: string): Promise<number> {
    const shop = await this.shopModel.findById(shopId).exec().catch(err => {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error happened while finding the shop!')
    });
    return shop.customers.length;
  }

  async getShopOrdersMetrics(shopId: string) {

    const shop = await this.shopModel.findById(shopId).exec().catch(err => {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error happened while finding the shop!')
    });

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }


    const orders = await this.orderModel.find({ shopID: shopId }).exec().catch(err => {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error happened while finding the orders!')
    });


    const hoursWithMostOrders = this.calculateMostOrdersByHour(orders);
    const daysWithMostOrders = this.calculateMostOrdersByDay(orders);
    const buyersWithMostOrders = this.calculateMostOrdersByBuyer(orders);

    return {
      hoursWithMostOrders,
      daysWithMostOrders,
      buyersWithMostOrders,
    };
  }
  private calculateMostOrdersByHour(orders: OrderDocument[]) {
    const orderCountsByHour = new Map<number, number>();

    orders.forEach((order) => {
      const orderHour = moment(order.createdAt).hour();
      orderCountsByHour.set(orderHour, (orderCountsByHour.get(orderHour) || 0) + 1);
    });


    let mostOrdersHour: number;
    let mostOrdersCount = 0;

    orderCountsByHour.forEach((count, hour) => {
      if (count > mostOrdersCount) {
        mostOrdersCount = count;
        mostOrdersHour = hour;
      }
    });

    return {
      mostOrdersHour,
      mostOrdersCount,
    };
  }

  private calculateMostOrdersByDay(orders: OrderDocument[]) {
    const orderCountsByDay = new Map<string, number>();

    orders.forEach((order) => {
      const orderDay = moment(order.createdAt).format('dddd');
      orderCountsByDay.set(orderDay, (orderCountsByDay.get(orderDay) || 0) + 1);
    });

    let mostOrdersDay: string;
    let mostOrdersCount = 0;

    orderCountsByDay.forEach((count, day) => {
      if (count > mostOrdersCount) {
        mostOrdersCount = count;
        mostOrdersDay = day;
      }
    });

    return {
      mostOrdersDay,
      mostOrdersCount,
    };
  }

  private calculateMostOrdersByBuyer(orders: OrderDocument[]) {
    const orderCountsByBuyer = new Map<string, number>();

    orders.forEach((order) => {
      const buyerId = order.buyerId;
      orderCountsByBuyer.set(buyerId, (orderCountsByBuyer.get(buyerId) || 0) + 1);
    });

    let mostOrdersBuyerId: string;
    let mostOrdersCount = 0;

    orderCountsByBuyer.forEach((count, buyerId) => {
      if (count > mostOrdersCount) {
        mostOrdersCount = count;
        mostOrdersBuyerId = buyerId;
      }
    });

    return {
      mostOrdersBuyerId,
      mostOrdersCount,
    };
  }
}
