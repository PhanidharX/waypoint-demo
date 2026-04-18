export interface SORRef {
  system: string;
  url: string;
  id: string | null;
  label: string;
}

export interface CapabilityStat {
  label: string;
  value: number | string;
  unit?: string;
  prefix?: string;
  suffix?: string;
  celebrate?: boolean;
  type?: string;
}

export interface CustomerAvailability {
  customer: string;
  state: 'adopted' | 'partial' | 'available' | 'not_offered';
  note: string;
  variants_adopted?: string[];
  variants_available?: string[];
}

export interface PartnerDep {
  partner_id: string;
  name: string;
  relationship: string;
  impact: string;
  sla_effect: string | null;
  golden_path_blocker: boolean;
  blocker_detail: string | null;
}

export interface CTA {
  label: string;
  type: 'intake' | 'self-service' | 'external';
  intake_template: string | null;
  channel: string | null;
}

export interface Capability {
  id: string;
  icon: string;
  shortName: string;
  name: string;
  type: 'prose' | 'matrix' | 'boundary';
  maturity: 'golden_path' | 'manual' | 'in_progress' | 'mixed';
  planes: string[];
  statement: string;
  detail: string;
  selfService?: string[];
  needsPE?: string[];
  stats?: CapabilityStat[];
  customerAvailability?: CustomerAvailability[];
  partnerDeps?: PartnerDep[];
  ctas?: CTA[];
}

export interface Partner {
  id: string;
  name: string;
  area: string;
  desc: string;
  whatWeConsume: string[];
  integrationPoint: string;
  engagementProcess: string;
  theirCycle: string;
  frontDoor: string;
  spaceLink: string;
  isCustomer: boolean;
  affects_capabilities?: { capability_id: string; how: string }[];
  sor_ref?: SORRef;
}

export interface Project {
  id: number;
  name: string;
  customer: string;
  track: 'idp' | 'ongoing';
  status: 'on-track' | 'in-progress' | 'slipping' | 'complete';
  lead: string;
  planes: string[];
  lastUpdated: string;
  scopeCreep: number;
  sor_ref?: SORRef;
  channel?: SORRef;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  primaryPlane: string;
  secondaryPlane?: string;
  hat?: string;
  onSupportToday: boolean;
  projects: number[];
  bandwidth: number | null;
  profile_link?: SORRef;
}
