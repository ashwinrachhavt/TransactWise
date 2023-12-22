-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
