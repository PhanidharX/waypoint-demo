import { readYaml } from '@/lib/yaml';
import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import PersonaCards from '@/components/home/PersonaCards';
import RightNow from '@/components/home/RightNow';

interface Config {
  team_name: string;
  vocabulary: { rotation: string };
  sprint: {
    current_sprint: string;
    cadence: string;
    idp_cycle_week: number;
    idp_cycle_total: number;
  };
  stats: {
    enabled: boolean;
    items: {
      id: string;
      label: string;
      value: number | null;
      prefix?: string;
      suffix?: string;
      celebrate?: boolean;
    }[];
  };
}

interface TeamMember {
  name: string;
  onSupportToday: boolean;
}

export default function Home() {
  const config = readYaml<Config>('config.yaml');
  const { team: members } = readYaml<{ team: TeamMember[] }>('team.yaml');
  const supportPerson = members?.find((m) => m.onSupportToday)?.name ?? null;

  return (
    <main style={{ paddingTop: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <Hero teamName={config.team_name} />

        {config.stats.enabled && (
          <StatsBar items={config.stats.items} />
        )}

        <PersonaCards />

        <RightNow
          sprint={config.sprint}
          vocabulary={config.vocabulary}
          supportPerson={supportPerson}
        />
      </div>
    </main>
  );
}
