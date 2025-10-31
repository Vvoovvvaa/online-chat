import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848013802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_c8c4e5bfdb28f12dc9a73dd3b5" ON "chat_members_user" ("userId") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c8c4e5bfdb28f12dc9a73dd3b5"`);

    }

}
