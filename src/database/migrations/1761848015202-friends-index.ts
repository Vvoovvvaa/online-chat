import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848015202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_1b39aefb73d6970426cbf6371b" ON "Friends" ("userId_1") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_1b39aefb73d6970426cbf6371b"`);

    }

}
