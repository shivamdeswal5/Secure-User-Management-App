import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749817174122 implements MigrationInterface {
    name = 'Migration1749817174122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImg" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImg"`);
    }

}
