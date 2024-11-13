-- CreateTable
CREATE TABLE "Doador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "mensagem" TEXT,
    "status" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_confirmacao" TIMESTAMP(3),
    "doadorId" INTEGER NOT NULL,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "chave_pix" TEXT NOT NULL,
    "qr_code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_expiracao" TIMESTAMP(3) NOT NULL,
    "data_confirmacao" TIMESTAMP(3),
    "doacaoId" INTEGER NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doador_email_key" ON "Doador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_doacaoId_key" ON "Pagamento"("doacaoId");

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_doadorId_fkey" FOREIGN KEY ("doadorId") REFERENCES "Doador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "Doacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
