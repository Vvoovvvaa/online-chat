import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761847244260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Friends" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_edeff3cc748f8719815aa6b2e6c" PRIMARY KEY ("userId_1", "userId_2"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Friends"`);

    }

}
