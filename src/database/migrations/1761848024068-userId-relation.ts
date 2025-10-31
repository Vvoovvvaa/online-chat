import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848024068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_5bc57789dbe2673b6fe8f79177b" FOREIGN KEY ("ownerIdId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_5bc57789dbe2673b6fe8f79177b"`);

    }

}
