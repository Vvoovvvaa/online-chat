import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761847242673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_members_user" ("chatId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0659796185219b27cd0d7eadb48" PRIMARY KEY ("chatId", "userId"))`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "chat_members_user"`);

    }

}
