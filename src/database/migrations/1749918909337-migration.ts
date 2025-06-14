import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749918909337 implements MigrationInterface {
    name = 'Migration1749918909337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "accountStatus" SET DEFAULT 'unverified'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "accountStatus" SET DEFAULT 'unverifed'`);
    }

}
