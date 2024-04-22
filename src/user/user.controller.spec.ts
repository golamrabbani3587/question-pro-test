import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UsersController', () => {
  let userController: UsersController;
  let userServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    userServiceMock = {
      getAllUsersWithHierarchyByPosition: jest.fn().mockReturnValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: userServiceMock }],
    }).compile();

    userController = module.get<UsersController>(UsersController);
  });

  describe('getAllUsersWithHierarchy', () => {
    it('should return an empty array', async () => {
      const result = await userController.getAllUsersWithHierarchy();

      expect(result).toEqual([]);
      
      expect(userServiceMock.getAllUsersWithHierarchyByPosition).toHaveBeenCalled();
    });
  });
});
