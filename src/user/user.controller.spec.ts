import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userController = module.get<UsersController>(UsersController);
  });

  describe('getAllUsersWithHierarchy', () => {
    it('should return an empty array', () => {
      const result = userService.getAllUsersWithHierarchyByPosition();
      expect(result).toEqual([]);
    });
  });
});
