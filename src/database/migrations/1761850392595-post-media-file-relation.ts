import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761850392595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_media_files" ADD CONSTRAINT "FK_c0ddc5f43e0f2fb14d73ee7cb35" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_media_files" DROP CONSTRAINT "FK_c0ddc5f43e0f2fb14d73ee7cb35"`);

    }

}
