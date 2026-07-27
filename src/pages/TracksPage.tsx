import { ArrowRight, Braces, CircuitBoard, Layers3, Radar } from "lucide-react";
import { tracks } from "../content/registry";
import { TrackCard } from "../components/tracks/TrackCard";
import { useProgress } from "../features/progress/ProgressContext";
import { selectTrackProgress } from "../features/progress/progressSelectors";
import { Link } from "../router";

export default function TracksPage() {
  const { state } = useProgress();
  const activeTracks = tracks.filter((track) => track.status === "available").length;
  const fragmentCount = tracks.reduce(
    (total, track) =>
      total + track.worlds.reduce((count, world) => count + world.lessons.length, 0),
    0,
  );
  const worldCount = tracks.reduce((total, track) => total + track.worlds.length, 0);

  return (
    <main id="main-content" className="page-shell tracks-page v51-tracks-page">
      <header className="v51-page-hero">
        <div>
          <div className="v51-release-chip">
            <span />
            Curriculum network / 5 active expeditions
          </div>
          <p className="eyebrow">Language systems index</p>
          <h1>Choose the kind of software you want to understand.</h1>
          <p>
            Follow a complete language path or combine expeditions around a project. Every
            route now reaches production-oriented topics instead of stopping at syntax
            exercises.
          </p>
          <div className="button-row">
            <Link className="button button-primary" to="/tracks/python">
              Enter Python Core <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button-secondary" to="/atlas">
              Search all lessons
            </Link>
          </div>
        </div>
        <aside className="v51-index-console" aria-label="Curriculum totals">
          <Radar aria-hidden="true" />
          <span>Network status</span>
          <strong>{String(activeTracks).padStart(2, "0")}/05</strong>
          <dl>
            <div>
              <dt>Lessons</dt>
              <dd>{fragmentCount}</dd>
            </div>
            <div>
              <dt>Worlds</dt>
              <dd>{worldCount}</dd>
            </div>
          </dl>
        </aside>
      </header>

      <section className="v51-track-principles" aria-label="Learning model">
        <article>
          <Braces aria-hidden="true" />
          <div>
            <strong>Runnable where honest</strong>
            <span>Python, JavaScript, and web previews execute in-browser.</span>
          </div>
        </article>
        <article>
          <CircuitBoard aria-hidden="true" />
          <div>
            <strong>Architecture before decoration</strong>
            <span>
              State, data flow, ownership, boundaries, and failure are explicit.
            </span>
          </div>
        </article>
        <article>
          <Layers3 aria-hidden="true" />
          <div>
            <strong>Projects connect the tracks</strong>
            <span>Milestones turn lessons into complete portfolio-ready systems.</span>
          </div>
        </article>
      </section>

      <section className="v51-tracks-heading">
        <div>
          <span className="section-number">01 / ACTIVE EXPEDITIONS</span>
          <h2>Five paths through one engineering discipline.</h2>
        </div>
        <p>
          Select a track to inspect its curriculum map, runtime model, latest sector,
          achievements, and next unlocked lesson.
        </p>
      </section>

      <section className="tracks-grid v51-tracks-grid" aria-label="Programming tracks">
        {tracks.map((track, index) => (
          <TrackCard
            key={track.id}
            track={track}
            featured={index === 0}
            progress={selectTrackProgress(track, state.progress)}
          />
        ))}
      </section>
    </main>
  );
}
