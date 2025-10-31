import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1761850213226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Friends" ADD CONSTRAINT "FK_e480ae3de2f21dd7fa037824c34" FOREIGN KEY ("userId_2") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Friends" DROP CONSTRAINT "FK_e480ae3de2f21dd7fa037824c34"`);

    }

}
