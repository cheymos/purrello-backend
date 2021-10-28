import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBoards1635420923516 implements MigrationInterface {
    name = 'CreateBoards1635420923516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boards" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "isPrivate" boolean NOT NULL DEFAULT true, "ownerId" integer NOT NULL, "lastUpdated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "FK_dcdf669d9c6727190556702de56" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "FK_dcdf669d9c6727190556702de56"`);
        await queryRunner.query(`DROP TABLE "boards"`);
    }

}
