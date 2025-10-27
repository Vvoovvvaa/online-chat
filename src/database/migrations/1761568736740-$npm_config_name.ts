// import { MigrationInterface, QueryRunner } from "typeorm";

// export class  $npmConfigName1761568736740 implements MigrationInterface {
//     name = ' $npmConfigName1761568736740'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type" "public"."chat_type_enum" NOT NULL DEFAULT 'private', "ownerIdId" integer, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "userId" integer, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "secret_code" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_610a9caa2f2a1850b40c4151a3f" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "LastName" character varying, "phone" character varying NOT NULL, "age" integer, "isPrivate" character varying NOT NULL DEFAULT 'public', CONSTRAINT "UQ_1f5c894f79cd0159ff4e1a44508" UNIQUE ("phone"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "userId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "media_files" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "path" character varying NOT NULL, "size" integer NOT NULL, "meta" jsonb, CONSTRAINT "PK_93b4da6741cd150e76f9ac035d8" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "postId" integer, "authorId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "postId" integer, "commentId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "chat_members_user" ("chatId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0659796185219b27cd0d7eadb48" PRIMARY KEY ("chatId", "userId"))`);
//         await queryRunner.query(`CREATE INDEX "IDX_cd7edbaccbb127f22fecd29674" ON "chat_members_user" ("chatId") `);
//         await queryRunner.query(`CREATE INDEX "IDX_c8c4e5bfdb28f12dc9a73dd3b5" ON "chat_members_user" ("userId") `);
//         await queryRunner.query(`CREATE TABLE "Friends" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_edeff3cc748f8719815aa6b2e6c" PRIMARY KEY ("userId_1", "userId_2"))`);
//         await queryRunner.query(`CREATE INDEX "IDX_1b39aefb73d6970426cbf6371b" ON "Friends" ("userId_1") `);
//         await queryRunner.query(`CREATE INDEX "IDX_e480ae3de2f21dd7fa037824c3" ON "Friends" ("userId_2") `);
//         await queryRunner.query(`CREATE TABLE "user_media_files" ("user_id" integer NOT NULL, "media_file_id" integer NOT NULL, CONSTRAINT "PK_357462598c18ca7fc05dc342662" PRIMARY KEY ("user_id", "media_file_id"))`);
//         await queryRunner.query(`CREATE INDEX "IDX_e1846a30fd64b7721f23499d78" ON "user_media_files" ("user_id") `);
//         await queryRunner.query(`CREATE INDEX "IDX_66284736af2f31f95c22d0b36c" ON "user_media_files" ("media_file_id") `);
//         await queryRunner.query(`CREATE TABLE "post_media_files" ("post_id" integer NOT NULL, "media_file_id" integer NOT NULL, CONSTRAINT "PK_e4e4492a32d7fae2ee8d67b95e8" PRIMARY KEY ("post_id", "media_file_id"))`);
//         await queryRunner.query(`CREATE INDEX "IDX_c0ddc5f43e0f2fb14d73ee7cb3" ON "post_media_files" ("post_id") `);
//         await queryRunner.query(`CREATE INDEX "IDX_d9f76a4b34ee9d3362513edb8c" ON "post_media_files" ("media_file_id") `);
//         await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_5bc57789dbe2673b6fe8f79177b" FOREIGN KEY ("ownerIdId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "secret_code" ADD CONSTRAINT "FK_31eaffc464cf1a56c15b7bba7e5" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4548cc4a409b8651ec75f70e280" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_ec3c75d6522fc60e0ebaf58a6b7" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "chat_members_user" ADD CONSTRAINT "FK_cd7edbaccbb127f22fecd296743" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "chat_members_user" ADD CONSTRAINT "FK_c8c4e5bfdb28f12dc9a73dd3b57" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "Friends" ADD CONSTRAINT "FK_1b39aefb73d6970426cbf6371be" FOREIGN KEY ("userId_1") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "Friends" ADD CONSTRAINT "FK_e480ae3de2f21dd7fa037824c34" FOREIGN KEY ("userId_2") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "user_media_files" ADD CONSTRAINT "FK_e1846a30fd64b7721f23499d789" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "user_media_files" ADD CONSTRAINT "FK_66284736af2f31f95c22d0b36c1" FOREIGN KEY ("media_file_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "post_media_files" ADD CONSTRAINT "FK_c0ddc5f43e0f2fb14d73ee7cb35" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "post_media_files" ADD CONSTRAINT "FK_d9f76a4b34ee9d3362513edb8c2" FOREIGN KEY ("media_file_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "post_media_files" DROP CONSTRAINT "FK_d9f76a4b34ee9d3362513edb8c2"`);
//         await queryRunner.query(`ALTER TABLE "post_media_files" DROP CONSTRAINT "FK_c0ddc5f43e0f2fb14d73ee7cb35"`);
//         await queryRunner.query(`ALTER TABLE "user_media_files" DROP CONSTRAINT "FK_66284736af2f31f95c22d0b36c1"`);
//         await queryRunner.query(`ALTER TABLE "user_media_files" DROP CONSTRAINT "FK_e1846a30fd64b7721f23499d789"`);
//         await queryRunner.query(`ALTER TABLE "Friends" DROP CONSTRAINT "FK_e480ae3de2f21dd7fa037824c34"`);
//         await queryRunner.query(`ALTER TABLE "Friends" DROP CONSTRAINT "FK_1b39aefb73d6970426cbf6371be"`);
//         await queryRunner.query(`ALTER TABLE "chat_members_user" DROP CONSTRAINT "FK_c8c4e5bfdb28f12dc9a73dd3b57"`);
//         await queryRunner.query(`ALTER TABLE "chat_members_user" DROP CONSTRAINT "FK_cd7edbaccbb127f22fecd296743"`);
//         await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_ec3c75d6522fc60e0ebaf58a6b7"`);
//         await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
//         await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
//         await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4548cc4a409b8651ec75f70e280"`);
//         await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
//         await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
//         await queryRunner.query(`ALTER TABLE "secret_code" DROP CONSTRAINT "FK_31eaffc464cf1a56c15b7bba7e5"`);
//         await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
//         await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
//         await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_5bc57789dbe2673b6fe8f79177b"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_d9f76a4b34ee9d3362513edb8c"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_c0ddc5f43e0f2fb14d73ee7cb3"`);
//         await queryRunner.query(`DROP TABLE "post_media_files"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_66284736af2f31f95c22d0b36c"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_e1846a30fd64b7721f23499d78"`);
//         await queryRunner.query(`DROP TABLE "user_media_files"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_e480ae3de2f21dd7fa037824c3"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_1b39aefb73d6970426cbf6371b"`);
//         await queryRunner.query(`DROP TABLE "Friends"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_c8c4e5bfdb28f12dc9a73dd3b5"`);
//         await queryRunner.query(`DROP INDEX "public"."IDX_cd7edbaccbb127f22fecd29674"`);
//         await queryRunner.query(`DROP TABLE "chat_members_user"`);
//         await queryRunner.query(`DROP TABLE "likes"`);
//         await queryRunner.query(`DROP TABLE "comments"`);
//         await queryRunner.query(`DROP TABLE "media_files"`);
//         await queryRunner.query(`DROP TABLE "posts"`);
//         await queryRunner.query(`DROP TABLE "User"`);
//         await queryRunner.query(`DROP TABLE "secret_code"`);
//         await queryRunner.query(`DROP TABLE "message"`);
//         await queryRunner.query(`DROP TABLE "chat"`);
//     }

// }
