/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_mail_key" ON "users"("mail");
