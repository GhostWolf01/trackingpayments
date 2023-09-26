import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const controller = context.getClass().name;

    const { id } = request.params;

    let entity;

    const typesControllers = {
      TransactionController: async () => {
        entity = await this.transactionService.findOne(id);
      },
      CategoryController: async () => {
        entity = await this.categoryService.findOne(id);
      },
      default: async () => {
        throw new BadRequestException();
      },
    };

    await (typesControllers[controller]?.() || typesControllers.default());

    const user = request.user;

    return entity && user && entity.user.id == user.id;
  }
}
