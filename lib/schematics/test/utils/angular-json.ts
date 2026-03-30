export interface AngularJson {
  projects: Projects;
}

export interface Build {
  options?: BuildOptions;
}

export interface BuildOptions {
  scripts?: string[];
  styles?: string[];
}

export interface Project {
  architect?: Target;
  prefix: string;
  projectType: string;
  root: string;
  sourceRoot: string;
}

export type Projects = Partial<Record<string, Project>>;

export interface Target {
  build: Build;
}
