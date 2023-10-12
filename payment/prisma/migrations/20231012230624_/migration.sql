-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "status" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL
);
