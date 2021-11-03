import { MigrationInterface, QueryRunner } from 'typeorm';

export class BasicSeed1635526391712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // password: password
    await queryRunner.query(
      `INSERT INTO users(username, email, password) VALUES('foo', 'foo@purrello.com', '$2b$05$d8dkmsBYF3Mb3ZQ5u3V4ou8gHAxIoJW/rsOa0NPfArgomCLw2l0JK')`,
    );
    await queryRunner.query(
      `INSERT INTO boards(title, "isPrivate", "ownerId") VALUES('Board title!', true, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO columns(title, pos, "boardId") VALUES('Column title', 1, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO cards(content, pos, "columnId") VALUES('Card content', 1, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO comments(content, "userId", "cardId") VALUES('Good comment', 1, 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
