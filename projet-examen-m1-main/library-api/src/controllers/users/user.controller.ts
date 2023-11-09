import { Controller, Get, Param, Post } from '@nestjs/common/decorators';
import { PlainUserPresenter } from 'library-api/src/controllers/users/user.presenter';
import { UserId } from 'library-api/src/entities/';
import { UserModel, PlainUserModel } from 'library-api/src/models';
import { UserUseCases } from 'library-api/src/useCases';

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
