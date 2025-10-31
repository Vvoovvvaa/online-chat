import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761847234936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "User" ("id" SERIAL NOT NULL,"created_at" TIMESTAMP NOT NULL DEFAULT now(),"updated_at" TIMESTAMP NOT NULL DEFAULT now(),"name" character varying NOT NULL,"LastName" character varying,"phone" character varying NOT NULL,"age" integer,"isPrivate" character varying NOT NULL DEFAULT 'public',CONSTRAINT "UQ_1f5c894f79cd0159ff4e1a44508" UNIQUE ("phone"),CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(`
      INSERT INTO "User" ("name", "LastName", "phone", "age", "isPrivate")
      VALUES ('Admin', 'User', '+0000000000', 30, 'public');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "User"`);
  }
}
