import { create } from "zustand";
import {
  FactoryState,
  FactoryCommit,
  GitHubRepo,
  GitHubBranch,
  FactoryMetrics,
  ProductionLine,
  demoCommits,
  demoMetrics,
} from "@/lib/types";

interface FactoryStore extends FactoryState {
  // Actions
  setRepo: (repo: GitHubRepo | null) => void;
  setBranches: (branches: GitHubBranch[]) => void;
  setCommits: (commits: FactoryCommit[]) => void;
  addCommit: (commit: FactoryCommit) => void;
  updateCommitStatus: (
    sha: string,
    status: FactoryCommit["status"]
  ) => void;
  setMetrics: (metrics: FactoryMetrics) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  loadDemoData: () => void;
  reset: () => void;
}

const initialState: FactoryState = {
  repo: null,
  branches: [],
  commits: [],
  productionLines: [],
  metrics: demoMetrics,
  isLoading: false,
  error: null,
};

export const useFactoryStore = create<FactoryStore>((set, get) => ({
  ...initialState,

  setRepo: (repo) => set({ repo }),

  setBranches: (branches) => {
    // Create production lines from branches
    const productionLines: ProductionLine[] = branches.slice(0, 5).map(
      (branch, index) => ({
        id: index,
        name: branch.name,
        branch: branch.name,
        commits: [],
        throughput: Math.random() * 10 + 5,
        efficiency: Math.random() * 20 + 80,
        status: index === 0 ? "active" : Math.random() > 0.3 ? "active" : "idle",
      })
    );
    set({ branches, productionLines });
  },

  setCommits: (commits) => set({ commits }),

  addCommit: (commit) =>
    set((state) => ({
      commits: [commit, ...state.commits].slice(0, 50),
    })),

  updateCommitStatus: (sha, status) =>
    set((state) => ({
      commits: state.commits.map((c) =>
        c.sha === sha ? { ...c, status } : c
      ),
    })),

  setMetrics: (metrics) => set({ metrics }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  loadDemoData: () => {
    set({
      repo: {
        owner: "Tonymora1982",
        name: "Geekslab-portfolio",
        fullName: "Tonymora1982/Geekslab-portfolio",
        description: "Portfolio monorepo with Next.js apps",
        language: "TypeScript",
        stars: 5,
        forks: 0,
        openIssues: 2,
        defaultBranch: "main",
      },
      branches: [
        { name: "main", commit: { sha: "abc123", url: "" }, protected: true },
        { name: "develop", commit: { sha: "def456", url: "" }, protected: false },
        { name: "feature/lab", commit: { sha: "ghi789", url: "" }, protected: false },
      ],
      commits: demoCommits,
      productionLines: [
        {
          id: 0,
          name: "Main Production",
          branch: "main",
          commits: demoCommits,
          throughput: 8.5,
          efficiency: 94.2,
          status: "active",
        },
        {
          id: 1,
          name: "Development",
          branch: "develop",
          commits: [],
          throughput: 12.3,
          efficiency: 87.5,
          status: "active",
        },
        {
          id: 2,
          name: "Feature Line",
          branch: "feature/lab",
          commits: [],
          throughput: 5.1,
          efficiency: 91.8,
          status: "idle",
        },
      ],
      metrics: demoMetrics,
      isLoading: false,
      error: null,
    });
  },

  reset: () => set(initialState),
}));
