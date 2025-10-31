import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1761848021285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`CREATE INDEX "IDX_c0ddc5f43e0f2fb14d73ee7cb3" ON "post_media_files" ("post_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`DROP INDEX "public"."IDX_c0ddc5f43e0f2fb14d73ee7cb3"`);

    }

}
