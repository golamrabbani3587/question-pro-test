import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1713711005925 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO "user" ("name", "positionId", "email", "password", "positionName", "parentId") VALUES
        ('User 1', 1, 'user1@example.com', '$2b$10$VMxHMDSLeS2T85fTiqPBX.LSaaXEf5pjtubLNycTNH2qySej5fqGO', 'Position 1', NULL),
        ('User 2', 2, 'user2@example.com', '$2b$10$VMxHMDSLeS2T85fTiqPBX.LSaaXEf5pjtubLNycTNH2qySej5fqGO', 'Position 2', NULL),
        ('User 3', 3, 'user3@example.com', '$2b$10$VMxHMDSLeS2T85fTiqPBX.LSaaXEf5pjtubLNycTNH2qySej5fqGO', 'Position 3', NULL),
        ('User 4', 4, 'user4@example.com', '$2b$10$VMxHMDSLeS2T85fTiqPBX.LSaaXEf5pjtubLNycTNH2qySej5fqGO', 'Position 4', NULL),
        ('User 5', 5, 'user5@example.com', '$2b$10$VMxHMDSLeS2T85fTiqPBX.LSaaXEf5pjtubLNycTNH2qySej5fqGO', 'Position 5', NULL)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}

