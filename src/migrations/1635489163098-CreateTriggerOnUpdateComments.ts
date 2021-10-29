import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTriggerOnUpdateComments1635489163098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TRIGGER update_comments_modcolumn BEFORE UPDATE ON comments
            FOR EACH ROW EXECUTE PROCEDURE modify_last_updated()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS TRIGGER update_comments_modcolumn ON comments`);
    }

}
