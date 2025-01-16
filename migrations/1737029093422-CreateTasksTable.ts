import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1737029093422 implements MigrationInterface {
    name = 'CreateTasksTable1737029093422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dueDate" date NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'Pending', "priority" "public"."task_priority_enum" NOT NULL DEFAULT 'Blue', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
