import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa6';
import {
  SiApachekafka,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from 'react-icons/si';

export type CoreSkill = {
  name: string;
  Icon: IconType;
  brandColor: string;
};

export const coreStack: CoreSkill[] = [
  { name: 'TypeScript', Icon: SiTypescript, brandColor: '#3178C6' },
  { name: 'Node.js', Icon: SiNodedotjs, brandColor: '#5FA04E' },
  { name: 'AWS', Icon: FaAws, brandColor: '#FF9900' },
  { name: 'Kafka', Icon: SiApachekafka, brandColor: '#cf6679' },
  { name: 'PostgreSQL', Icon: SiPostgresql, brandColor: '#4169E1' },
  { name: 'React', Icon: SiReact, brandColor: '#61DAFB' },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const comfortableWith: SkillGroup[] = [
  {
    category: 'Languages & Frameworks',
    items: [
      'JavaScript',
      'Python',
      'C#',
      '.NET Core',
      'NestJS',
      'Express',
      'Bun',
      'Hono',
      'Electron',
      'HTML/CSS',
    ],
  },
  {
    category: 'Cloud & Infra',
    items: [
      'AWS Lambda',
      'AWS CDK',
      'DynamoDB',
      'S3',
      'ECS',
      'X-Ray',
      'Azure',
      'Google Cloud',
      'Terraform',
      'OpenTofu',
      'Spacelift',
      'Docker',
      'LocalStack',
    ],
  },
  {
    category: 'Data & APIs',
    items: [
      'MySQL',
      'MongoDB',
      'Redis',
      'Prisma',
      'TypeORM',
      'Redpanda',
      'Protocol Buffers',
      'REST',
      'GraphQL',
      'OpenAPI',
      'AsyncAPI',
      'Zod',
      'Stripe',
      'Basis Theory',
      'JWT/JWKS',
    ],
  },
  {
    category: 'Operations & Tooling',
    items: [
      'GitHub Actions',
      'Bitbucket Pipelines',
      'Grafana',
      'Prometheus',
      'New Relic',
      'CloudWatch',
      'OpenTelemetry',
      'Vitest',
      'Jest',
      'Playwright',
      'MSW',
      'oclif',
      'esbuild',
      'Claude Code MCP',
    ],
  },
];

// Kept for backward compatibility — not used by the new Skills component.
export const skillGroups = comfortableWith;
