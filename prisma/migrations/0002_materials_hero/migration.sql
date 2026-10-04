-- Add the configurable hero gallery and public PDF materials.
ALTER TABLE "SiteSettings"
ADD COLUMN "heroImages" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN "heroIntervalSeconds" INTEGER NOT NULL DEFAULT 7;

CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "mediaId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Resource_mediaId_key" ON "Resource"("mediaId");
CREATE INDEX "Resource_enabled_position_idx" ON "Resource"("enabled", "position");

ALTER TABLE "Resource"
ADD CONSTRAINT "Resource_mediaId_fkey"
FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
