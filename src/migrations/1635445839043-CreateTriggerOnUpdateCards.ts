import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTriggerOnUpdateCards1635445839043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TRIGGER update_cards_modcolumn BEFORE UPDATE ON cards
            FOR EACH ROW EXECUTE PROCEDURE modify_last_updated()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_cards_modcolumn on cards`);
    }

}
