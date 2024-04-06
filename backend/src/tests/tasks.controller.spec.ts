import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('TaskController', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should pass', () => {
    expect(true).toBe(true);
  });
});
