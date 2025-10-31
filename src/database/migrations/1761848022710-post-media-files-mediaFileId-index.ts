import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848022710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_d9f76a4b34ee9d3362513edb8c" ON "post_media_files" ("media_file_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d9f76a4b34ee9d3362513edb8c"`);

    }

}
