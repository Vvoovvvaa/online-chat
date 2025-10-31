import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1761848995182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_ec3c75d6522fc60e0ebaf58a6b7" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_ec3c75d6522fc60e0ebaf58a6b7"`);

    }

}
