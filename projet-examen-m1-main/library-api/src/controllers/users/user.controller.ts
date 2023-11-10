import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger'; // Importez les décorateurs Swagger nécessaires
import { PlainUserPresenter } from './user.presenter';
import { UserId } from '../../entities/';
import { UserModel, PlainUserModel } from '../../models';
import { UserUseCases } from '../../useCases';

@ApiTags('users') // Ajoutez un tag Swagger pour le contrôleur
@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: PlainUserPresenter,
    isArray: true,
  })
  public async getAll(): Promise<PlainUserPresenter[]> {
    const users = await this.userUseCases.getAllPlain();
    return users.map(PlainUserPresenter.from);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: PlainUserPresenter,
  })
  public async getById(@Param('id') id: UserId): Promise<PlainUserPresenter> {
    const user = await this.userUseCases.getById(id);
    return PlainUserPresenter.from(user);
  }


  @Delete('/delete/:id')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  public async deleteUser(@Param('id') id: UserId): Promise<void> {
    await this.userUseCases.deleteUser(id);
  }
}
