import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1761847231083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "userId" integer, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(`DROP TABLE "message"`);

    }

}
