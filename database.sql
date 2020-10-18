CREATE TABLE "tasks"(
"id" serial primary key,
"task_description" varchar(500) NOT NULL,
"category" varchar(30),
"priority" varchar(30),
"complete_status" boolean
);

