export type ResumeEntry = {
  title: string;
  org: string;
  dates: string;
  location?: string;
  stack?: string[];
  bullets?: string[];
};

export type ProjectEntry = {
  title: string;
  stack: string[];
  description: string;
  href?: string;
};

export const education: ResumeEntry[] = [
  {
    title: 'Master of Science in Information Science',
    org: 'University of North Carolina at Chapel Hill',
    dates: '',
  },
  {
    title: 'Bachelor of Arts — Biology (major), Economics (minor)',
    org: 'Duke University',
    dates: '',
  },
];

export const certifications: string[] = [];

export const experience: ResumeEntry[] = [
  {
    title: 'Software Engineer',
    org: 'Jewelers Mutual Insurance Group',
    dates: 'Oct 2024 – Present',
    location: 'Remote',
    stack: [
      'TypeScript',
      'Node.js',
      'AWS Lambda',
      'Kafka',
      'PostgreSQL',
      'Prisma',
      'Bun',
      'Spacelift',
      'Terraform',
      'Stripe',
      'GitHub Actions',
      'Protocol Buffers',
    ],
    bullets: [
      'Lead engineer on CoreServices, a greenfield event-driven microservices platform modernizing legacy insurance systems — 30+ services across quoting, ordering, payments, pricing, and customer management (TypeScript, Node.js, AWS Lambda, Kafka/Redpanda, PostgreSQL, Prisma).',
      'Co-architect and build a custom internal microservices framework — 7 packages, ~10k lines of TypeScript — providing the runtime SDK, CLI tooling, build system, infrastructure registry, and shared libraries powering all CoreServices development (TypeScript, Zod, oclif, esbuild, Bun).',
      'Develop the framework’s core SDK: a declarative `defineLambda()` API with multi-trigger support (Kafka, API Gateway, SQS, CloudWatch cron), Zod schema validation with full type inference, idempotency hooks, and typed event production with automatic routing.',
      'Build a developer CLI that scaffolds services + handlers, manages local dev environments, compiles service manifests into Spacelift configs, bundles Lambdas, and generates API specs from handler declarations (oclif, esbuild, OpenAPI, AsyncAPI).',
      'Maintain the infrastructure registry — a generated, type-safe single source of truth for DynamoDB tables, Kafka topics, RDS accounts, secrets paths, and network configs consumed by every service at compile time.',
      'Develop shared utility libraries: AWS service client wrappers, Prisma adapters, third-party integrations (Stripe, Basis Theory, Guidewire SOAP, PLRating, Smarty, Iterable, Mixpanel).',
      'Create a local event hub enabling full event-driven development without AWS, with service auto-registration and in-memory event routing (Bun, Hono, Zod OpenAPI).',
      'Build and maintain the central API gateway orchestrating all microservices with OpenAPI spec generation, Zod validation, and DynamoDB-backed idempotency.',
      'Implement a JWT/JWKS authentication service with DynamoDB event idempotency for secure inter-service communication.',
      'Develop the payment service integrating Stripe for charges and Basis Theory for PCI-compliant payment tokenization with idempotent transaction handling.',
      'Engineer data migration tooling to transform and migrate data from legacy systems (SQL Server) to the new platform (PostgreSQL, Prisma, AWS S3, Azure).',
      'Design and implement the full CI/CD pipeline with smart change detection, automated semantic versioning, OIDC keyless AWS auth, and parallel deployment across dev/test/stage/prod with database migration orchestration (GitHub Actions, Prisma, AWS OIDC).',
      'Build Spacelift/OpenTofu deployment infrastructure with codegen that compiles service manifests into stack configs, Lambda partitioning across stacks to manage Terraform state at scale, and automated stack triggering via the Spacelift GraphQL API.',
      'Build observability infrastructure with Grafana dashboard templates, CloudWatch, X-Ray tracing, and Prometheus monitoring for production services.',
      'Manage cloud infrastructure across dev/test/stage/prod — VPC networking, Lambda configuration, Aurora PostgreSQL, and S3 (Terraform, Terragrunt, AWS).',
      'Define inter-service messaging contracts using Protocol Buffers for type-safe event schemas published to GitHub’s npm registry (protobuf, ts-proto).',
      'Create the local development environment orchestrating PostgreSQL, MinIO (S3), Redpanda (Kafka), and LocalStack for full-stack local testing (Docker Compose, LocalStack).',
      'Pioneer AI-assisted development workflows — built Claude Code MCP integrations and platform architecture documentation to accelerate team velocity.',
    ],
  },
  {
    title: 'Software Engineer II',
    org: 'ImageQuix',
    dates: 'Jul 2021 – Oct 2024',
    location: 'Raleigh, NC',
    stack: [
      'TypeScript',
      'React',
      'Electron',
      'NestJS',
      'Node.js',
      'TypeORM',
      'Prisma',
      'Redis',
      'AWS ECS',
      'Terraform',
      'Stripe',
      'New Relic',
    ],
    bullets: [
      'Engineer on a high-volume photography workflow app: Electron, React, React-Redux, Node.js, Express, NestJS, TypeScript.',
      'Major contributor on a new e-commerce platform — frontend and backend services (React, NestJS, AWS).',
      'Frontend: lazy-loading masonry student galleries, custom cropping tool, full checkout UX (React, React-Redux).',
      'Backend: persistent sessions with complex auth, Stripe payment integration, checkout validation (NestJS, TypeORM, Redis, AWS).',
      'Key developer on a new core image-processing microservice and pipeline — migrated from AOT to JIT processing to cut S3 + Lambda costs, with pre-caching, monitoring, and autoscaling (NestJS, Prisma, OpenTelemetry, Prometheus, Fluent Bit).',
      'Triaged production fires via observability tooling (New Relic, CloudWatch, PerconaDB).',
      'DevOps across pipelines and environments (Bitbucket Pipelines, Jenkins, AWS ECS/ECR, Terraform).',
    ],
  },
  {
    title: 'Associate Technical Consultant',
    org: 'Salesforce',
    dates: 'Feb 2021 – Jul 2021',
    location: 'Remote',
    stack: ['Salesforce', 'OmniStudio', 'JavaScript', 'Apex'],
    bullets: [
      'Built enterprise web and mobile Salesforce solutions on the Customer 360 platform (Salesforce, JavaScript, Apex).',
      'Consultant engineer on insurance portals and websites.',
    ],
  },
  {
    title: 'Rainbow Six Siege Community Manager',
    org: 'Ubisoft',
    dates: 'Oct 2016 – Sep 2020',
    location: 'Raleigh, NC',
    stack: ['Tableau', 'Brandwatch', 'Synthesio', 'Community KPIs'],
    bullets: [
      'Drove community engagement and growth — indexed qualitative sentiment reporting against quantitative community KPIs.',
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    title: 'Star-Eighty-Six',
    stack: ['React Remix', 'TypeScript', 'Prisma', 'ShadCN', 'Google Cloud'],
    description:
      'Inspired by r/unsentletters: record anonymous voicemails for anyone. Voice memos auto-expire. Includes Google speech-to-text transcripts, emoji reactions, and tags.',
  },
  {
    title: 'Project Dexter — Raspberry Pi Pet Camera',
    stack: ['Raspberry Pi', 'Python', 'ML'],
    description:
      'A Pi camera + sound sensor that triggers when the doggy bell is rung, runs an ML model to confirm a dog is in frame, and posts to Slack via a bot.',
    href: 'https://github.com/ruvvet/project-dexter',
  },
  {
    title: "Master's Thesis — Real-Time Tweet Summarization",
    stack: ['Python', 'SQLite', 'Twitter API', 'ML'],
    description:
      'Real-time summarization of tweets during esports streams to detect events and generate a live timeline.',
    href: 'https://cdr.lib.unc.edu/concern/masters_papers/j3860b75j',
  },
  {
    title: 'VODSWEEPER',
    stack: ['React', 'Express', 'TypeScript', 'TypeORM', 'Chakra UI'],
    description:
      'Algorithmically matches and syncs Twitch VODs with the games actually played — timestamps, API-delivered game details, and unique data give a fuller VOD experience.',
  },
  {
    title: 'OTP — Friend Finder',
    stack: ['React', 'Express', 'TypeScript', 'TypeORM', 'Socket.io'],
    description: 'Tinder-style app that connects gamers with other gamers based on shared interests.',
    href: 'https://github.com/ruvvet/otp-ui',
  },
  {
    title: 'WApp — Water Tracking',
    stack: ['React', 'Express', 'MongoDB', 'Mongoose'],
    description: 'Water tracking app personalized to each user profile.',
    href: 'https://github.com/WAPP-Water-App',
  },
  {
    title: 'UwuMoji — Discord Emoji Manager',
    stack: ['Node', 'Express', 'Postgres', 'Sequelize'],
    description: 'Upload, edit, and add emojis to a Discord server via the Discord API + a bot.',
    href: 'https://github.com/ruvvet/uwumoji-app',
  },
  {
    title: 'Untitled Game',
    stack: ['JavaScript', 'HTML5 Canvas'],
    description: 'Arcade-style canvas game in vanilla JavaScript.',
    href: 'https://ruvvet.github.io/untitled-game',
  },
];
