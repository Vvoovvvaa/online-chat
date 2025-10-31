import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761850209663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_members_user" ADD CONSTRAINT "FK_c8c4e5bfdb28f12dc9a73dd3b57" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_members_user" DROP CONSTRAINT "FK_c8c4e5bfdb28f12dc9a73dd3b57"`);

    }

}
