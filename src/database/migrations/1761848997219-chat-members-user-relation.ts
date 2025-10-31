import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761848997219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_members_user" ADD CONSTRAINT "FK_cd7edbaccbb127f22fecd296743" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_members_user" DROP CONSTRAINT "FK_cd7edbaccbb127f22fecd296743"`);

    }

}
