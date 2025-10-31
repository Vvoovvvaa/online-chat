import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848986517 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "secret_code" ADD CONSTRAINT "FK_31eaffc464cf1a56c15b7bba7e5" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "secret_code" DROP CONSTRAINT "FK_31eaffc464cf1a56c15b7bba7e5"`);

    }

}
