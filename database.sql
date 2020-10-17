CREATE TABLE "tasks"(
"id" serial primary key,
"task_description" varchar(500) NOT NULL,
"complete_status" boolean
);

INSERT INTO "tasks"("task_description", "complete_status")
VALUES('take out the trash', 'no');