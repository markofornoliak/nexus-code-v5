import {
  ArrowRight,
  Binary,
  Boxes,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Database,
  Gauge,
  Globe2,
  Orbit,
  RadioTower,
  Rocket,
  ShieldCheck,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { Link } from "../router";
import { PRODUCT } from "../app/config/product";
import { achievements } from "../content/achievements";
import { tracks } from "../content/registry";
import { useProgress } from "../features/progress/ProgressContext";
import {
  selectContinueLesson,
  selectTrackProgress,
} from "../features/progress/progressSelectors";
import { AchievementCard } from "../components/achievements/AchievementCard";
import { TrackCard } from "../components/tracks/TrackCard";
import { NexusCoreExperience } from "../features/visual-lab/NexusCoreExperience";
import { MissionDeck } from "../components/progress/MissionDeck";
import { projects } from "../content/projects";
import { getPrimaryRecommendation } from "../features/recommendations/recommendations";

const capabilityCards = [
  {
    icon: Code2,
    label: "Programming fluency",
    title: "Write code that survives change",
    text: "Move from syntax to functions, data models, algorithms, state, and explicit contracts.",
  },
  {
    icon: Database,
    label: "Data reasoning",
    title: "Transform information deliberately",
    text: "Build pipelines, validate boundaries, aggregate signals, and preserve deterministic behavior.",
  },
  {
    icon: Globe2,
    label: "Interface engineering",
    title: "Design accessible adaptive systems",
    text: "Use semantic structure, resilient layouts, visual tokens, and humane interaction feedback.",
  },
  {
    icon: Boxes,
    label: "Software architecture",
    title: "Separate responsibilities clearly",
    text: "Practice value objects, services, modules, ownership, composition roots, and project boundaries.",
  },
  {
    icon: CircuitBoard,
    label: "Systems thinking",
    title: "Understand execution and failure",
    text: "Model event flow, runtime isolation, observability, memory, concurrency, and recovery paths.",
  },
  {
    icon: Rocket,
    label: "Delivery practice",
    title: "Finish complete working artifacts",
    text: "Turn lessons into milestone-based projects with acceptance criteria and verification evidence.",
  },
] as const;

export default function LandingPage() {
  const { state } = useProgress();
  const python = tracks[0];
  if (!python) return null;

  const continueSelection = selectContinueLesson(state.progress);
  const availableTracks = tracks.filter((track) => track.status === "available");
  const lessons = availableTracks.flatMap((track) =>
    track.worlds.flatMap((world) =>
      world.lessons.filter((lesson) => lesson.status === "available"),
    ),
  );
  const lessonCount = lessons.length;
  const taskCount = lessons.reduce((total, lesson) => total + lesson.tasks.length + 1, 0);
  const worldCount = availableTracks.reduce(
    (total, track) => total + track.worlds.length,
    0,
  );
  const primaryRoute = continueSelection
    ? `/learn/${continueSelection.track.id}/${continueSelection.lesson.id}`
    : "/tracks/python";
  const pythonProgress = selectTrackProgress(python, state.progress);
  const recommendation = getPrimaryRecommendation(state);
  const latestProjects = projects.slice(-3);

  return (
    <main id="main-content" className="v51-landing">
      <section className="v51-hero section-shell">
        <div className="v51-hero-copy">
          <div className="v51-release-chip">
            <span />
            NEXUS CODE 5.1 / Systems curriculum online
          </div>
          <p className="eyebrow">{PRODUCT.metaphor}</p>
          <h1>
            Learn to build software
            <em>that behaves like a system.</em>
          </h1>
          <p className="v51-hero-description">
            A browser-native programming academy for Python, JavaScript, web, Java, and
            C++. Run real code, inspect system behavior, complete production-style
            missions, and keep every achievement locally.
          </p>
          <div className="button-row v51-hero-actions">
            <Link className="button button-primary" to={primaryRoute}>
              {continueSelection
                ? `Continue ${continueSelection.track.language}`
                : "Start the Python pathway"}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button-secondary" to="/atlas">
              Open curriculum atlas
            </Link>
            <Link className="button button-ghost" to="/projects">
              Explore project forge
            </Link>
          </div>
          <div className="v51-trust-row" aria-label="Platform capabilities">
            <span>
              <TerminalSquare aria-hidden="true" /> Real browser runtimes
            </span>
            <span>
              <ShieldCheck aria-hidden="true" /> Local-first progress
            </span>
            <span>
              <CheckCircle2 aria-hidden="true" /> Accessible by design
            </span>
          </div>
        </div>

        <div className="v51-hero-stage">
          <NexusCoreExperience initialTrackId={continueSelection?.track.id ?? "python"} />
          <aside className="v51-command-card" aria-label="Current learning command">
            <div className="v51-command-card-top">
              <span>Live learning command</span>
              <Gauge aria-hidden="true" />
            </div>
            <strong>{continueSelection?.lesson.title ?? "The First Signal"}</strong>
            <p>
              {continueSelection
                ? `${continueSelection.track.language} · ${continueSelection.lesson.durationMinutes} min`
                : "Python · beginner launch sequence"}
            </p>
            <div className="v51-command-progress" aria-hidden="true">
              <span style={{ width: `${Math.max(pythonProgress.percent, 8)}%` }} />
            </div>
            <dl>
              <div>
                <dt>Signal energy</dt>
                <dd>{state.progress.totalXp}</dd>
              </div>
              <div>
                <dt>Python restored</dt>
                <dd>{pythonProgress.percent}%</dd>
              </div>
            </dl>
            <Link to={primaryRoute}>
              Open coordinate <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section
        className="v51-metric-ribbon section-shell"
        aria-label="Curriculum inventory"
      >
        <article>
          <span>01 / Lessons</span>
          <strong>{lessonCount}</strong>
          <small>subject-specific learning coordinates</small>
        </article>
        <article>
          <span>02 / Practice</span>
          <strong>{taskCount}</strong>
          <small>required tasks and bonus missions</small>
        </article>
        <article>
          <span>03 / Worlds</span>
          <strong>{worldCount}</strong>
          <small>progressive curriculum sectors</small>
        </article>
        <article>
          <span>04 / Projects</span>
          <strong>{projects.length}</strong>
          <small>complete system-building dossiers</small>
        </article>
      </section>

      <MissionDeck />

      <section
        className="section-shell v51-recommendation"
        aria-label="Recommended next action"
      >
        <div className="v51-recommendation-orbit" aria-hidden="true">
          <Orbit />
        </div>
        <div>
          <span className="instrument-label">Adaptive route recommendation</span>
          <h2>{recommendation.title}</h2>
          <p>{recommendation.reason}</p>
        </div>
        <Link className="button button-primary" to={recommendation.route}>
          {recommendation.label} <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="section-shell v51-curriculum-section">
        <header className="v51-section-heading">
          <div>
            <span className="section-number">01 / CURRICULUM NETWORK</span>
            <p className="eyebrow">Five languages, one coherent architecture</p>
            <h2>Choose the system you want to understand next.</h2>
          </div>
          <p>
            Each expedition now ends in a new production-oriented sector: automation,
            product systems, interface systems, domain architecture, or performance.
          </p>
        </header>
        <div className="v51-track-grid">
          {tracks.map((track, index) => (
            <TrackCard
              featured={index === 0}
              key={track.id}
              track={track}
              progress={selectTrackProgress(track, state.progress)}
            />
          ))}
        </div>
      </section>

      <section className="v51-capability-band">
        <div className="section-shell">
          <header className="v51-section-heading is-inverted">
            <div>
              <span className="section-number">02 / SKILL ARCHITECTURE</span>
              <p className="eyebrow">Beyond isolated syntax</p>
              <h2>Build a portfolio of engineering capabilities.</h2>
            </div>
            <p>
              The curriculum is organized around decisions that real software requires:
              data, state, boundaries, interfaces, architecture, and delivery.
            </p>
          </header>
          <div className="v51-capability-grid">
            {capabilityCards.map(({ icon: Icon, label, title, text }, index) => (
              <article key={title}>
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" />
                </div>
                <small>{label}</small>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell v51-project-section">
        <header className="v51-section-heading">
          <div>
            <span className="section-number">03 / PROJECT FORGE</span>
            <p className="eyebrow">New production-style missions</p>
            <h2>Turn knowledge into evidence.</h2>
          </div>
          <Link className="text-link" to="/projects">
            View all {projects.length} projects <ArrowRight aria-hidden="true" />
          </Link>
        </header>
        <div className="v51-project-preview-grid">
          {latestProjects.map((project, index) => {
            const track = tracks.find((candidate) => candidate.id === project.trackId);
            return (
              <article
                className={`v51-project-preview accent-${track?.accent ?? "cyan"}`}
                key={project.id}
              >
                <div className="v51-project-preview-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Workflow aria-hidden="true" />
                </div>
                <small>{track?.language ?? project.trackId}</small>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <dl>
                  <div>
                    <dt>Milestones</dt>
                    <dd>{project.milestones.length}</dd>
                  </div>
                  <div>
                    <dt>Estimated</dt>
                    <dd>{project.estimatedMinutes} min</dd>
                  </div>
                </dl>
                <Link to="/projects">
                  Inspect project dossier <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell v51-relic-section">
        <header className="v51-section-heading">
          <div>
            <span className="section-number">04 / MASTERY RECORD</span>
            <p className="eyebrow">Progress with meaning</p>
            <h2>Relics record verified accomplishments.</h2>
          </div>
          <div className="v51-energy-readout">
            <RadioTower aria-hidden="true" />
            <span>
              <small>Total signal energy</small>
              <strong>{state.progress.totalXp}</strong>
            </span>
          </div>
        </header>
        <div className="relic-preview-grid">
          {achievements.slice(0, 3).map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={state.progress.unlockedAchievementIds.includes(achievement.id)}
              unlockedAt={state.progress.achievementDates[achievement.id]}
              compact
            />
          ))}
        </div>
      </section>

      <section className="v51-final-cta section-shell">
        <div className="v51-final-mark" aria-hidden="true">
          <Binary />
        </div>
        <div>
          <span className="eyebrow">{PRODUCT.fullName} / systems release</span>
          <h2>Your next program should explain itself.</h2>
          <p>
            Continue the active route or calibrate a new learning plan. Every completed
            task becomes durable evidence in your local archive.
          </p>
        </div>
        <div className="button-row">
          <Link className="button button-primary" to={primaryRoute}>
            Resume learning <ArrowRight aria-hidden="true" />
          </Link>
          <Link className="button button-secondary" to="/onboarding">
            Recalibrate route
          </Link>
        </div>
      </section>
    </main>
  );
}
