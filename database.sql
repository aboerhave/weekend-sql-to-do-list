-- This is the database.sql file for the weekend assignment for week 9 of Prime Digital Academy
-- for Adam Boerhave, to make a to do list app, created 10/16/2020 - 10/18/2020

-- This is the sql command to create the database table used
CREATE TABLE "tasks"(
"id" serial primary key,
"task_description" varchar(500) NOT NULL,
"category" varchar(30),
"priority" integer,
"complete_status" boolean
);