import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UsersController', () => {
  let userController: UsersController;
  let userServiceMock: Partial<UsersService>; // Mocked UsersService

  beforeEach(async () => {
    // Create a mock of the UsersService
    userServiceMock = {
      getAllUsersWithHierarchyByPosition: jest.fn().mockReturnValue([]),
    };

    // Create a Nest testing module with the UsersController and the mocked UsersService
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: userServiceMock }],
    }).compile();

    // Retrieve an instance of the UsersController
    userController = module.get<UsersController>(UsersController);
  });

  describe('getAllUsersWithHierarchy', () => {
    it('should return an empty array', async () => {
      // Call the controller method being tested
      const result = await userController.getAllUsersWithHierarchy();

      // Assert that the result matches the expected value
      expect(result).toEqual([]);
      
      // Assert that the method on the mocked service was called
      expect(userServiceMock.getAllUsersWithHierarchyByPosition).toHaveBeenCalled();
    });
  });
});
