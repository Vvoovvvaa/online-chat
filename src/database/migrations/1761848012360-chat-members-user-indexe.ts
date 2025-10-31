import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848012360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_cd7edbaccbb127f22fecd29674" ON "chat_members_user" ("chatId") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_cd7edbaccbb127f22fecd29674"`);

    }

}
