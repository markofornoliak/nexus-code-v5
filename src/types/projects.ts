import type { EditorLanguage } from "./content";

export interface ProjectMilestone {
  id: string;
  title: string;
  objective: string;
  acceptanceCriteria: string[];
  starterFiles: Record<string, string>;
}

export interface LearningProject {
  id: string;
  trackId: string;
  title: string;
  subtitle: string;
  difficulty: "guided" | "applied" | "capstone";
  estimatedMinutes: number;
  language: EditorLanguage;
  summary: string;
  outcomes: string[];
  architectureNotes: string[];
  milestones: ProjectMilestone[];
}
