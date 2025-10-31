import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761850211507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Friends" ADD CONSTRAINT "FK_1b39aefb73d6970426cbf6371be" FOREIGN KEY ("userId_1") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Friends" DROP CONSTRAINT "FK_1b39aefb73d6970426cbf6371be"`);

    }

}
