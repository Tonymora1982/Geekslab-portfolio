export interface SLAData {
    uptime: number;
    latency: number;
    errorRate: number;
    status: 'healthy' | 'degraded' | 'critical';
    lastUpdated: string;
}

export interface Experiment {
    id: string;
    title: string;
    category: 'optimization' | 'architecture' | 'failure' | 'research';
    date: string;
    status: 'running' | 'validated' | 'failed';
}

export interface Project {
    id: string;
    title: string;
    description: string;
    stack: string[];
}

export interface Technology {
    name: string;
    category: 'languages' | 'frameworks' | 'tools' | 'platforms';
    level: 'expert' | 'proficient' | 'familiar';
}

export interface RFCFormData {
    companyName: string;
    contactEmail: string;
    projectDescription: string;
    budget: string;
    timeline: string;
}
