import { Controller, Get, Param, Post } from '@nestjs/common/decorators';
import { PlainUserPresenter } from './user.presenter';
import { UserId } from '../../entities/';
import { UserModel, PlainUserModel } from '../../models';
import { UserUseCases } from '../../useCases';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainUserPresenter[]> {
    const users = await this.userUseCases.getAllPlain();

    return users.map(PlainUserPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: UserId): Promise<PlainUserPresenter> {
    const user = await this.userUseCases.getById(id);

    return PlainUserPresenter.from(user);
  }

  @Post('/delete/:id')
  public async deleteUser(@Param('id') id: UserId): Promise<void> {
    await this.userUseCases.deleteUser(id);
  }
}
