import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848016519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_e480ae3de2f21dd7fa037824c3" ON "Friends" ("userId_2") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e480ae3de2f21dd7fa037824c3"`);

    }

}
