import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTriggerOnUpdateBoards1635421232627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TRIGGER update_boards_modcolumn BEFORE UPDATE ON boards
            FOR EACH ROW EXECUTE PROCEDURE modify_last_updated()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_boards_modcolumn on boards`);
    }

}
