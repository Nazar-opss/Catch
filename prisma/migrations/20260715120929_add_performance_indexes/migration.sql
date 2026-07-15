-- CreateIndex
CREATE INDEX "comment_dealId_idx" ON "comment"("dealId");

-- CreateIndex
CREATE INDEX "deal_temperature_id_idx" ON "deal"("temperature", "id");

-- CreateIndex
CREATE INDEX "deal_createdAt_id_idx" ON "deal"("createdAt", "id");

-- CreateIndex
CREATE INDEX "saved_deal_dealId_idx" ON "saved_deal"("dealId");

-- CreateIndex
CREATE INDEX "vote_dealId_idx" ON "vote"("dealId");
