// Types for GitHub integration and factory visualization

export interface GitHubCommit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    avatar_url?: string;
    date: string;
  };
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
  files?: {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
  }[];
}

export interface GitHubBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export interface GitHubRepo {
  owner: string;
  name: string;
  fullName: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
}

export interface FactoryCommit extends GitHubCommit {
  // Factory visualization properties
  position: [number, number, number];
  status: "pending" | "processing" | "passed" | "failed" | "shipped";
  productionLine: number;
  processingTime: number;
  qualityScore: number;
}

export interface ProductionLine {
  id: number;
  name: string;
  branch: string;
  commits: FactoryCommit[];
  throughput: number;
  efficiency: number;
  status: "active" | "idle" | "blocked";
}

export interface FactoryMetrics {
  // Throughput
  commitsPerHour: number;
  commitsPerDay: number;
  weeklyTrend: number[];

  // Quality
  passRate: number;
  failRate: number;
  defectRate: number;

  // Cycle Time
  avgCycleTime: number; // minutes from commit to deploy
  minCycleTime: number;
  maxCycleTime: number;

  // First Pass Yield
  firstPassYield: number;
  reworkRate: number;

  // Overall Equipment Effectiveness (OEE)
  availability: number;
  performance: number;
  quality: number;
  oee: number;
}

export interface FactoryState {
  repo: GitHubRepo | null;
  branches: GitHubBranch[];
  commits: FactoryCommit[];
  productionLines: ProductionLine[];
  metrics: FactoryMetrics;
  isLoading: boolean;
  error: string | null;
}

// Factory configuration
export interface FactoryConfig {
  conveyorSpeed: number;
  commitBoxSize: number;
  maxCommitsVisible: number;
  qualityCheckDuration: number;
  showLabels: boolean;
  showMetrics: boolean;
  cameraPosition: [number, number, number];
}

export const defaultFactoryConfig: FactoryConfig = {
  conveyorSpeed: 0.5,
  commitBoxSize: 1,
  maxCommitsVisible: 20,
  qualityCheckDuration: 2000,
  showLabels: true,
  showMetrics: true,
  cameraPosition: [15, 10, 15],
};

// Demo data for when no repo is connected
export const demoCommits: FactoryCommit[] = [
  {
    sha: "abc1234",
    message: "feat: Add user authentication",
    author: {
      name: "Tony Mora",
      email: "tony@geekslab.tech",
      date: new Date().toISOString(),
    },
    stats: { additions: 150, deletions: 20, total: 170 },
    position: [0, 0.5, 0],
    status: "shipped",
    productionLine: 0,
    processingTime: 45,
    qualityScore: 98,
  },
  {
    sha: "def5678",
    message: "fix: Resolve memory leak in dashboard",
    author: {
      name: "Tony Mora",
      email: "tony@geekslab.tech",
      date: new Date().toISOString(),
    },
    stats: { additions: 25, deletions: 45, total: 70 },
    position: [3, 0.5, 0],
    status: "passed",
    productionLine: 0,
    processingTime: 30,
    qualityScore: 95,
  },
  {
    sha: "ghi9012",
    message: "refactor: Optimize database queries",
    author: {
      name: "Tony Mora",
      email: "tony@geekslab.tech",
      date: new Date().toISOString(),
    },
    stats: { additions: 80, deletions: 120, total: 200 },
    position: [6, 0.5, 0],
    status: "processing",
    productionLine: 0,
    processingTime: 60,
    qualityScore: 88,
  },
  {
    sha: "jkl3456",
    message: "test: Add unit tests for API",
    author: {
      name: "Tony Mora",
      email: "tony@geekslab.tech",
      date: new Date().toISOString(),
    },
    stats: { additions: 300, deletions: 10, total: 310 },
    position: [9, 0.5, 0],
    status: "pending",
    productionLine: 0,
    processingTime: 0,
    qualityScore: 0,
  },
];

export const demoMetrics: FactoryMetrics = {
  commitsPerHour: 3.5,
  commitsPerDay: 28,
  weeklyTrend: [22, 25, 30, 28, 32, 18, 12],
  passRate: 94.5,
  failRate: 5.5,
  defectRate: 2.1,
  avgCycleTime: 45,
  minCycleTime: 15,
  maxCycleTime: 120,
  firstPassYield: 92.3,
  reworkRate: 7.7,
  availability: 98.5,
  performance: 95.2,
  quality: 94.5,
  oee: 88.6,
};
