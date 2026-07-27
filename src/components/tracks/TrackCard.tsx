import { ArrowUpRight, LockKeyhole, Radio, Sparkles } from "lucide-react";
import { Link } from "../../router";
import type { Track, TrackProgress } from "../../types";
import { ProgressBar } from "../common/ProgressBar";
import { StatusChip } from "../common/StatusChip";

interface TrackCardProps {
  track: Track;
  progress: TrackProgress;
  featured?: boolean;
}

export function TrackCard({ track, progress, featured = false }: TrackCardProps) {
  const lessonCount = track.worlds.reduce(
    (count, world) => count + world.lessons.length,
    0,
  );
  const latestWorld = track.worlds.at(-1);
  const statusLabel =
    track.status === "available"
      ? "Operational"
      : track.status === "preview"
        ? "Preview access"
        : "Sealed";

  return (
    <article
      className={`track-card v51-track-card accent-${track.accent}${featured ? " is-featured" : ""}`}
    >
      <div className="v51-track-card-index" aria-hidden="true">
        {String(track.order).padStart(2, "0")}
      </div>
      <div className="track-card-top">
        <div className="track-glyph" aria-hidden="true">
          {track.icon}
        </div>
        <StatusChip tone={track.status === "available" ? "active" : "warning"}>
          {statusLabel}
        </StatusChip>
      </div>
      <div className="v51-track-card-copy">
        <p className="archive-label">{track.archiveName}</p>
        <h2>{track.language}</h2>
        <h3>{track.title}</h3>
        <p>{track.description}</p>
      </div>
      <div className="v51-latest-sector">
        <Sparkles aria-hidden="true" />
        <span>
          <small>Latest sector</small>
          <strong>{latestWorld?.title ?? "Archive threshold"}</strong>
        </span>
      </div>
      <dl className="track-metadata">
        <div>
          <dt>Level</dt>
          <dd>{track.difficulty}</dd>
        </div>
        <div>
          <dt>Worlds</dt>
          <dd>{track.worlds.length}</dd>
        </div>
        <div>
          <dt>Lessons</dt>
          <dd>{lessonCount}</dd>
        </div>
      </dl>
      <div className="v51-track-progress-copy">
        <span>Restoration progress</span>
        <strong>{progress.percent}%</strong>
      </div>
      <ProgressBar value={progress.percent} label={`${track.language} progress`} />
      <div className="v51-runtime-line">
        <Radio aria-hidden="true" /> {track.execution.runtimeLabel}
      </div>
      <Link className="track-action" to={`/tracks/${track.id}`}>
        {track.status === "available" ? "Open curriculum map" : "Inspect preview"}
        {track.status === "coming-soon" ? (
          <LockKeyhole size={17} aria-hidden="true" />
        ) : (
          <ArrowUpRight size={17} aria-hidden="true" />
        )}
      </Link>
    </article>
  );
}
