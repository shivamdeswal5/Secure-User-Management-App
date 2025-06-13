import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749807606168 implements MigrationInterface {
    name = 'Migration1749807606168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
