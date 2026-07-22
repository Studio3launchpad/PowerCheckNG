import { GlassCard } from "@/components/GlassCard";
import { BackupOptionCard } from "./BackupOptionCard";
import { BackupOptionSection } from "./BackupOptionSection";
import { useState } from "react";
import {
  BACKUP_SYSTEMS,
  GENERATOR_SYSTEMS,
  type BackupRecommendation,
  type BackupType,
  type GeneratorRecommendation,
} from "@/lib/backup/backupAdvisor";
import { SectionHeader } from "@/components/common/SectionHeader";

type Props = {
  bestTechnology: BackupType;
  inverter: BackupRecommendation;
  generator: GeneratorRecommendation;
};

type Section = "inverter" | "generator" | "hybrid";

export function AlternativeBackupOptions({ bestTechnology, inverter, generator }: Props) {
  const [openSection, setOpenSection] = useState<Section | null>(
    bestTechnology === "GENERATOR"
      ? "generator"
      : bestTechnology === "HYBRID"
        ? "hybrid"
        : "inverter",
  );

  return (
    <GlassCard>
      <div className="space-y-8">
        <SectionHeader
          title="Alternative Backup Solutions"
          description="Explore alternative backup solutions for different power needs and budgets."
        />

        {/* ===================== INVERTERS ===================== */}

        <BackupOptionSection
          title={`Inverter Backup Options (${BACKUP_SYSTEMS.length})`}
          open={openSection === "inverter"}
          onToggle={() => setOpenSection(openSection === "inverter" ? null : "inverter")}
        >
          {BACKUP_SYSTEMS.map((system) => {
            const recommended =
              bestTechnology !== "GENERATOR" && system.inverter === inverter.inverter;

            const recommendation =
              system.maxLoad <= 500
                ? "Ideal for lighting, fans and basic entertainment."
                : system.maxLoad <= 1000
                  ? "Suitable for small homes and essential appliances."
                  : system.maxLoad <= 1800
                    ? "Recommended for medium households with moderate power demand."
                    : "Designed for larger homes with higher backup requirements.";

            return (
              <BackupOptionCard
                key={system.inverter}
                title={system.inverter}
                subtitle={`Battery: ${system.battery}`}
                cost={system.estimatedCost}
                maxLoad={system.maxLoad}
                recommended={recommended}
                recommendation={recommendation}
              />
            );
          })}
        </BackupOptionSection>

        {/* ===================== GENERATORS ===================== */}

        <BackupOptionSection
          title={`Generator Backup Options (${GENERATOR_SYSTEMS.length})`}
          open={openSection === "generator"}
          onToggle={() => setOpenSection(openSection === "generator" ? null : "generator")}
        >
          {GENERATOR_SYSTEMS.map((system) => {
            const recommended = bestTechnology === "GENERATOR" && system.name === generator.name;

            return (
              <BackupOptionCard
                key={system.name}
                title={system.name}
                subtitle={`Fuel: ${system.fuelCost}`}
                cost={system.estimatedCost}
                maxLoad={system.maxLoad}
                recommended={recommended}
                recommendation="Suitable for longer outages and heavier electrical loads."
              />
            );
          })}
        </BackupOptionSection>

        {/* ===================== HYBRID ===================== */}

        <BackupOptionSection
          title="Hybrid Backup System (1)"
          open={openSection === "hybrid"}
          onToggle={() => setOpenSection(openSection === "hybrid" ? null : "hybrid")}
        >
          <BackupOptionCard
            title="Inverter + Generator"
            subtitle="Combines an inverter for efficient daily backup with a generator for extended outages and higher electrical demand."
            recommended={bestTechnology === "HYBRID"}
          />
        </BackupOptionSection>
      </div>
    </GlassCard>
  );
}
