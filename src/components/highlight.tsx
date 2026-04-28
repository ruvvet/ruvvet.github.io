import type { ReactNode } from 'react';

const KEYWORDS = [
  // Languages & runtimes
  'TypeScript',
  'JavaScript',
  'Python',
  '.NET Core',
  'Node.js',
  'C#',
  'Bun',
  'Hono',
  // Frameworks & UI
  'NestJS',
  'Express',
  'React-Redux',
  'React Remix',
  'React',
  'Electron',
  'ShadCN',
  'Chakra UI',
  'Salesforce',
  'OmniStudio',
  'Apex',
  // AWS — list multi-word entries first so longest-match wins
  'Aurora PostgreSQL',
  'API Gateway',
  'AWS Lambda',
  'AWS CDK',
  'AWS S3',
  'AWS ECS',
  'AWS ECR',
  'AWS OIDC',
  'AWS SDK',
  'AWS',
  'DynamoDB',
  'CloudFront',
  'CloudWatch',
  'X-Ray',
  // Other clouds
  'Azure',
  'Google Cloud',
  // Messaging & streaming
  'Apache Kafka',
  'KafkaJS',
  'Kafka',
  'Redpanda',
  // Databases & ORMs
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'SQL Server',
  'SQLite',
  'Redis',
  'Prisma',
  'TypeORM',
  'Sequelize',
  'Mongoose',
  'PerconaDB',
  // IaC
  'Spacelift',
  'OpenTofu',
  'Terragrunt',
  'Terraform',
  // Containers / local dev
  'Docker Compose',
  'Docker',
  'LocalStack',
  'MinIO',
  // CI/CD
  'GitHub Actions',
  'Bitbucket Pipelines',
  'Jenkins',
  // Payments & security
  'Stripe',
  'Basis Theory',
  'Guidewire',
  'JWT/JWKS',
  // API / integration
  'OpenAPI',
  'AsyncAPI',
  'GraphQL',
  'REST',
  'Zod',
  'SOAP',
  // Observability
  'Grafana',
  'Prometheus',
  'New Relic',
  'OpenTelemetry',
  'Fluent Bit',
  'Fluentbit',
  // Tooling
  'oclif',
  'esbuild',
  'Vitest',
  'Jest',
  'Playwright',
  'MSW',
  // Protocol / contract
  'Protocol Buffers',
  'protobuf',
  'ts-proto',
  // Community-mgmt tools
  'Tableau',
  'Brandwatch',
  'Synthesio',
  // AI / project nouns
  'Claude Code MCP',
  'Claude Code',
  'MCP',
  'CoreServices',
  // Hardware
  'Raspberry Pi',
  'HTML5 Canvas',
];

const sortedKeywords = [...KEYWORDS].sort((a, b) => b.length - a.length);
const escapedPattern = sortedKeywords
  .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|');
const pattern = new RegExp(`(?<![A-Za-z0-9])(${escapedPattern})(?![A-Za-z0-9])`, 'g');

export function highlightKeywords(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  pattern.lastIndex = 0;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));
    parts.push(
      <span key={`${m.index}-${m[0]}`} className="text-text/85">
        {m[0]}
      </span>,
    );
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}
