import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from '../controllers/authors/author.controller';
import { AuthorUseCases } from 'library-api/src/useCases';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorModel, PlainAuthorModel } from 'library-api/src/models';

describe('AuthorController', () => {
  let controller: AuthorController;

  const authorUseCasesMock = {
    getAllPlain: jest.fn(),
    getById: jest.fn(),
    createAuthor: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorUseCases,
          useValue: authorUseCasesMock,
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of authors when calling getAll', async () => {
    const mockAuthors: PlainAuthorPresenter[] = [/* create your mock data here */];
    authorUseCasesMock.getAllPlain.mockResolvedValue(mockAuthors);

    const result = await controller.getAll();

    expect(result).toEqual(mockAuthors);
  });

  it('should return an author when calling getById', async () => {
    const mockAuthor: PlainAuthorPresenter = authorFixture();
    authorUseCasesMock.getById.mockResolvedValue(mockAuthor);

    const result = await controller.getById('authorId');

    expect(result).toEqual(mockAuthor);
  });

  it('should create an author when calling createAuthor', async () => {
    const mockAuthorData: AuthorModel = {/* create your mock data here */};
    const mockCreatedAuthor: PlainAuthorModel = {/* create your mock data here */};
    authorUseCasesMock.createAuthor.mockResolvedValue(mockCreatedAuthor);

    const result = await controller.createAuthor(mockAuthorData);

    expect(result).toEqual(mockCreatedAuthor);
  });
});
