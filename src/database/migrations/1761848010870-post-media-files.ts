import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848010870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_media_files" ("post_id" integer NOT NULL, "media_file_id" integer NOT NULL, CONSTRAINT "PK_e4e4492a32d7fae2ee8d67b95e8" PRIMARY KEY ("post_id", "media_file_id"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post_media_files"`);

    }

}
