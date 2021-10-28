import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateModifyLastUpdatedTriggerFunc1635420986608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION modify_last_updated()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW."lastUpdated" = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP FUNCTION modify_last_updated()`)
    }

}
