import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Clock3,
  Compass,
  LockKeyhole,
  Radio,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Link, useParams } from "../router";
import { ProgressBar } from "../components/common/ProgressBar";
import { StatusChip } from "../components/common/StatusChip";
import { WorldMap } from "../components/tracks/WorldMap";
import { achievements } from "../content/achievements";
import { getOrderedLessons, getTrack } from "../content/registry";
import { useProgress } from "../features/progress/ProgressContext";
import {
  isLessonUnlocked,
  selectTrackProgress,
} from "../features/progress/progressSelectors";
import NotFoundPage from "./NotFoundPage";

export default function TrackPage() {
  const { trackId = "" } = useParams();
  const { state } = useProgress();
  const track = getTrack(trackId);
  if (!track)
    return (
      <NotFoundPage embedded message="This expedition does not exist in the archive." />
    );

  const progress = selectTrackProgress(track, state.progress);
  const orderedLessons = getOrderedLessons(track);
  const nextLesson = orderedLessons.find(
    (lesson) =>
      isLessonUnlocked(track, lesson.id, state.progress) &&
      state.progress.lessons[lesson.id]?.isCompleted !== true,
  );
  const latestWorld = track.worlds.at(-1);
  const trackAchievements = achievements.filter((achievement) => {
    const condition = achievement.condition;
    return (
      (condition.type === "track-completed" && condition.trackId === track.id) ||
      (condition.type === "world-completed" && condition.trackId === track.id) ||
      (condition.type === "lesson-completed" &&
        track.worlds.some((world) =>
          world.lessons.some((lesson) => lesson.id === condition.lessonId),
        ))
    );
  });

  return (
    <main id="main-content" className="page-shell track-page v51-track-page">
      <Link className="back-link" to="/tracks">
        <ArrowLeft aria-hidden="true" /> Language systems index
      </Link>

      <header className={`track-hero v51-track-hero accent-${track.accent}`}>
        <div className="v51-track-hero-grid">
          <div className="track-hero-glyph" aria-hidden="true">
            {track.icon}
          </div>
          <div className="track-hero-copy">
            <div className="chip-row">
              <StatusChip tone={track.status === "available" ? "active" : "warning"}>
                {track.status === "available" ? "Curriculum online" : "Preview channel"}
              </StatusChip>
              <span>{track.difficulty} pathway</span>
              <span>{track.execution.runtimeLabel}</span>
            </div>
            <p className="archive-label">{track.archiveName}</p>
            <h1>{track.title}</h1>
            <p>{track.description}</p>
            <div className="track-hero-stats">
              <div>
                <strong>{track.worlds.length}</strong>
                <span>worlds</span>
              </div>
              <div>
                <strong>{orderedLessons.length}</strong>
                <span>lessons</span>
              </div>
              <div>
                <strong>{progress.percent}%</strong>
                <span>restored</span>
              </div>
            </div>
            <ProgressBar
              value={progress.percent}
              label={`${track.language} expedition progress`}
            />
          </div>

          <aside className="v51-next-coordinate" aria-label="Next learning coordinate">
            <div>
              <Compass aria-hidden="true" />
              <span>Next coordinate</span>
            </div>
            <strong>{nextLesson?.title ?? "Pathway restored"}</strong>
            <p>
              {nextLesson
                ? `${nextLesson.subtitle} · ${nextLesson.durationMinutes} min`
                : "Review the Atlas or begin a project dossier."}
            </p>
            <Link
              className="button button-primary"
              to={nextLesson ? `/learn/${track.id}/${nextLesson.id}` : "/projects"}
            >
              {nextLesson ? "Open next lesson" : "Open project forge"}
              <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </header>

      {latestWorld && (
        <section className={`v51-latest-world accent-${track.accent}`}>
          <div className="v51-latest-world-copy">
            <span className="section-number">NEW / PRODUCTION SECTOR</span>
            <p className="eyebrow">{latestWorld.landmark}</p>
            <h2>{latestWorld.title}</h2>
            <p>{latestWorld.description}</p>
          </div>
          <div className="v51-latest-world-lessons">
            {latestWorld.lessons.map((lesson, index) => (
              <Link key={lesson.id} to={`/learn/${track.id}/${lesson.id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.subtitle}</small>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {track.status === "available" ? (
        <>
          <section className="map-section-heading v51-map-heading">
            <div>
              <p className="eyebrow">Progressive curriculum map</p>
              <h2>Build capability in sequence.</h2>
            </div>
            <p>
              Every world introduces a new responsibility. Complete lessons in order,
              unlock the next system boundary, and carry Signal Energy forward.
            </p>
          </section>
          <WorldMap track={track} progress={state.progress} />

          <section className="v51-track-capabilities">
            <header>
              <div>
                <span className="section-number">CAPABILITY MATRIX</span>
                <h2>What this pathway teaches you to control.</h2>
              </div>
              <Radio aria-hidden="true" />
            </header>
            <div>
              {track.worlds.slice(-4).map((world, index) => (
                <article key={world.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Workflow aria-hidden="true" />
                  <h3>{world.title}</h3>
                  <p>{world.subtitle}</p>
                  <small>{world.lessons.length} lessons</small>
                </article>
              ))}
            </div>
          </section>

          <section className="track-rewards v51-track-rewards">
            <div>
              <span className="eyebrow">Mastery evidence</span>
              <h2>Recoverable relics</h2>
              <p>
                These achievements record completed lessons, worlds, and full pathway
                mastery rather than passive activity.
              </p>
            </div>
            <div className="reward-list">
              {trackAchievements.map((achievement) => (
                <div key={achievement.id}>
                  <Sparkles aria-hidden="true" />
                  <span>{achievement.name}</span>
                  <small>{achievement.rarity}</small>
                </div>
              ))}
              {trackAchievements.length === 0 && (
                <div>
                  <BookOpenCheck aria-hidden="true" />
                  <span>Pathway completion record</span>
                  <small>in progress</small>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="preview-roadmap">
          <div className="preview-lessons">
            <p className="eyebrow">Recovered preview lessons</p>
            <h2>Inspect the threshold chamber</h2>
            {track.worlds.flatMap((world) =>
              world.lessons.map((lesson) => (
                <Link key={lesson.id} to={`/learn/${track.id}/${lesson.id}`}>
                  <span>{String(lesson.order).padStart(2, "0")}</span>
                  <div>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.subtitle}</p>
                  </div>
                  <Clock3 aria-hidden="true" />
                  <small>{lesson.durationMinutes} min</small>
                  <ArrowRight aria-hidden="true" />
                </Link>
              )),
            )}
          </div>
          <aside className="future-worlds">
            <LockKeyhole aria-hidden="true" />
            <span className="eyebrow">Future recovery plan</span>
            <h2>Sealed archive regions</h2>
            <ol>
              {track.futureWorlds?.map((world, index) => (
                <li key={world}>
                  <span>0{index + 2}</span>
                  <strong>{world}</strong>
                  <small>Awaiting reconstruction</small>
                </li>
              ))}
            </ol>
          </aside>
        </section>
      )}
    </main>
  );
}
