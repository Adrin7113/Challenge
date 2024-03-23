-- CreateTable
CREATE TABLE "Article" (
    "title" TEXT NOT NULL,
    "author" TEXT,
    "body" TEXT NOT NULL,
    "date" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");
