import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCards1635445130373 implements MigrationInterface {
    name = 'CreateCards1635445130373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "content" text NOT NULL, "pos" smallint NOT NULL, "columnId" integer NOT NULL, "lastUpdated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_aba53d80092e2fffe0d70e641b7" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_aba53d80092e2fffe0d70e641b7"`);
        await queryRunner.query(`DROP TABLE "cards"`);
    }

}
