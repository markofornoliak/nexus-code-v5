import { Check, Clock3, FileCode2, Layers3, RadioTower, ShieldCheck } from "lucide-react";
import { projects } from "../content/projects";
import { getTrack } from "../content/registry";
import { useProgress } from "../features/progress/ProgressContext";

export default function ProjectsPage() {
  const { state, dispatch } = useProgress();

  return (
    <main id="main-content" className="projects-page page-shell">
      <header className="page-hero compact-hero">
        <p className="eyebrow">Project forge / v5 assessments</p>
        <h1>Build complete systems, not isolated fragments.</h1>
        <p>
          Projects are cumulative checkpoints with milestone acceptance criteria,
          starter files, architecture notes, and local completion state. They remain
          realistic for a static browser app: Python and JavaScript run in isolated
          workers, HTML/CSS renders in a sandbox, and Java/C++ stay honest structural
          design exercises.
        </p>
      </header>

      <section className="project-metric-grid" aria-label="Project inventory">
        <article>
          <Layers3 aria-hidden="true" />
          <strong>{projects.length}</strong>
          <span>released projects</span>
        </article>
        <article>
          <FileCode2 aria-hidden="true" />
          <strong>
            {projects.reduce((total, project) => total + project.milestones.length, 0)}
          </strong>
          <span>milestones</span>
        </article>
        <article>
          <RadioTower aria-hidden="true" />
          <strong>
            {
              Object.values(state.projectProgress).filter((progress) => progress.isCompleted)
                .length
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

      <section className="project-list" aria-label="Learning projects">
        {projects.map((project) => {
          const track = getTrack(project.trackId);
          const progress = state.projectProgress[project.id];
          const completed = progress?.completedMilestoneIds ?? [];
          const percent = Math.round((completed.length / project.milestones.length) * 100);
          return (
            <article className={`project-card accent-${track?.accent ?? "cyan"}`} key={project.id}>
              <header>
                <div>
                  <span className="instrument-label">
                    {track?.language ?? project.trackId} / {project.difficulty}
                  </span>
                  <h2>{project.title}</h2>
                  <p>{project.subtitle}</p>
                </div>
                <div className="project-time">
                  <Clock3 aria-hidden="true" /> {project.estimatedMinutes} min
                </div>
              </header>
              <p>{project.summary}</p>
              <div className="project-progress" aria-label={`${percent}% complete`}>
                <span style={{ width: `${percent}%` }} />
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
              <div className="milestone-stack">
                {project.milestones.map((milestone, index) => {
                  const done = completed.includes(milestone.id);
                  return (
                    <section className={done ? "is-complete" : ""} key={milestone.id}>
                      <header>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <h3>{milestone.title}</h3>
                          <p>{milestone.objective}</p>
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
                          <Check aria-hidden="true" /> {done ? "Recorded" : "Mark done"}
                        </button>
                      </header>
                      <ul>
                        {milestone.acceptanceCriteria.map((criterion) => (
                          <li key={criterion}>{criterion}</li>
                        ))}
                      </ul>
                      <details>
                        <summary>Starter files</summary>
                        {Object.entries(milestone.starterFiles).map(([filename, code]) => (
                          <pre key={filename}>
                            <code>{`// ${filename}\n${code}`}</code>
                          </pre>
                        ))}
                      </details>
                    </section>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
