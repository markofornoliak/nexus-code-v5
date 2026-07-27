import {
  ArrowRight,
  Check,
  Clock3,
  FileCode2,
  Filter,
  Layers3,
  RadioTower,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { projects } from "../content/projects";
import { getTrack, tracks } from "../content/registry";
import { useProgress } from "../features/progress/ProgressContext";
import { Link } from "../router";

type ProjectFilter = "all" | "python" | "javascript" | "html-css" | "java" | "cpp";

export default function ProjectsPage() {
  const { state, dispatch } = useProgress();
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const visibleProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.trackId === filter),
    [filter],
  );
  const milestoneCount = projects.reduce(
    (total, project) => total + project.milestones.length,
    0,
  );

  return (
    <main id="main-content" className="projects-page page-shell v51-projects-page">
      <header className="v51-page-hero v51-projects-hero">
        <div>
          <div className="v51-release-chip">
            <span />
            Project forge / {projects.length} system dossiers
          </div>
          <p className="eyebrow">Evidence-based assessments</p>
          <h1>Build complete systems, not isolated fragments.</h1>
          <p>
            Every project has explicit architecture notes, acceptance criteria, starter
            files, and milestone records. New dossiers connect automation, product state,
            and accessible interface design to the expanded 5.1 curriculum.
          </p>
        </div>
        <aside className="v51-projects-orbit" aria-hidden="true">
          <div>
            <Sparkles />
            <strong>{projects.length}</strong>
            <span>Projects online</span>
          </div>
        </aside>
      </header>

      <section
        className="project-metric-grid v51-project-metrics"
        aria-label="Project inventory"
      >
        <article>
          <Layers3 aria-hidden="true" />
          <strong>{projects.length}</strong>
          <span>released projects</span>
        </article>
        <article>
          <FileCode2 aria-hidden="true" />
          <strong>{milestoneCount}</strong>
          <span>milestones</span>
        </article>
        <article>
          <RadioTower aria-hidden="true" />
          <strong>
            {
              Object.values(state.projectProgress).filter(
                (progress) => progress.isCompleted,
              ).length
            }
          </strong>
          <span>completed locally</span>
        </article>
        <article>
          <ShieldCheck aria-hidden="true" />
          <strong>local</strong>
          <span>no backend required</span>
        </article>
      </section>

      <section className="v51-project-filter" aria-label="Filter projects by language">
        <div>
          <Filter aria-hidden="true" />
          <span>Filter dossiers</span>
        </div>
        <div>
          <button
            type="button"
            className={filter === "all" ? "is-active" : ""}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All <small>{projects.length}</small>
          </button>
          {tracks.map((track) => {
            const count = projects.filter(
              (project) => project.trackId === track.id,
            ).length;
            return (
              <button
                type="button"
                key={track.id}
                className={filter === track.id ? "is-active" : ""}
                aria-pressed={filter === track.id}
                onClick={() => setFilter(track.id as ProjectFilter)}
              >
                {track.icon} {track.language} <small>{count}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="v51-project-list-heading">
        <div>
          <span className="section-number">ACTIVE DOSSIERS</span>
          <h2>{visibleProjects.length} projects in this view.</h2>
        </div>
        <p>
          Open milestone sections in sequence, inspect starter files, and record completed
          acceptance criteria directly on this device.
        </p>
      </section>

      <section className="project-list v51-project-list" aria-label="Learning projects">
        {visibleProjects.map((project, projectIndex) => {
          const track = getTrack(project.trackId);
          const progress = state.projectProgress[project.id];
          const completed = progress?.completedMilestoneIds ?? [];
          const percent = Math.round(
            (completed.length / project.milestones.length) * 100,
          );
          return (
            <article
              className={`project-card v51-project-card accent-${track?.accent ?? "cyan"}`}
              key={project.id}
            >
              <header>
                <div className="v51-project-card-title">
                  <span className="v51-project-sequence">
                    {String(projectIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="instrument-label">
                      {track?.language ?? project.trackId} / {project.difficulty}
                    </span>
                    <h2>{project.title}</h2>
                    <p>{project.subtitle}</p>
                  </div>
                </div>
                <div className="project-time">
                  <Clock3 aria-hidden="true" /> {project.estimatedMinutes} min
                </div>
              </header>

              <div className="v51-project-summary-grid">
                <div>
                  <p>{project.summary}</p>
                  <div className="project-progress" aria-label={`${percent}% complete`}>
                    <span style={{ width: `${percent}%` }} />
                  </div>
                  <div className="v51-project-progress-copy">
                    <span>{completed.length} milestones recorded</span>
                    <strong>{percent}% complete</strong>
                  </div>
                </div>
                <div className="v51-project-radar" aria-hidden="true">
                  <span>{percent}%</span>
                </div>
              </div>

              <div className="project-detail-grid">
                <section>
                  <h3>Outcomes</h3>
                  <ul>
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3>Architecture notes</h3>
                  <ul>
                    {project.architectureNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="milestone-stack v51-milestone-stack">
                {project.milestones.map((milestone, index) => {
                  const done = completed.includes(milestone.id);
                  return (
                    <details
                      className={done ? "is-complete" : ""}
                      key={milestone.id}
                      open={index === 0 && completed.length === 0}
                    >
                      <summary>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <h3>{milestone.title}</h3>
                          <p>{milestone.objective}</p>
                        </div>
                        <strong>{done ? "Recorded" : "Open milestone"}</strong>
                      </summary>
                      <div className="v51-milestone-body">
                        <ul>
                          {milestone.acceptanceCriteria.map((criterion) => (
                            <li key={criterion}>{criterion}</li>
                          ))}
                        </ul>
                        <div className="v51-starter-files">
                          <h4>Starter files</h4>
                          {Object.entries(milestone.starterFiles).map(
                            ([filename, code]) => (
                              <pre key={filename}>
                                <code>{`// ${filename}\n${code}`}</code>
                              </pre>
                            ),
                          )}
                        </div>
                        <button
                          type="button"
                          className="button button-ghost"
                          aria-pressed={done}
                          onClick={() =>
                            dispatch({
                              type: "record-project-milestone",
                              projectId: project.id,
                              milestoneId: milestone.id,
                              totalMilestones: project.milestones.length,
                              label: project.title,
                            })
                          }
                        >
                          <Check aria-hidden="true" />
                          {done ? "Milestone recorded" : "Record milestone"}
                        </button>
                      </div>
                    </details>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>

      <section className="v51-projects-footer">
        <div>
          <span className="eyebrow">From lesson to portfolio</span>
          <h2>Every dossier ends with visible acceptance evidence.</h2>
        </div>
        <Link className="button button-primary" to="/atlas">
          Open lesson atlas <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
