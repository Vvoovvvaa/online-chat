import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1761848019865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`CREATE INDEX "IDX_66284736af2f31f95c22d0b36c" ON "user_media_files" ("media_file_id") `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`DROP INDEX "public"."IDX_66284736af2f31f95c22d0b36c"`);

    }

}
