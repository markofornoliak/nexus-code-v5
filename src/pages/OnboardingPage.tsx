import { ArrowRight, CheckCircle2, Eye, Gauge, Goal, Sparkles } from "lucide-react";
import { useState } from "react";
import { tracks } from "../content/registry";
import { useProgress } from "../features/progress/ProgressContext";
import { Link, useNavigate } from "../router";
import type { ExperienceLevel, LearningGoal, UserPreferences } from "../types";

const experienceOptions: Array<{ value: ExperienceLevel; label: string; text: string }> =
  [
    {
      value: "new",
      label: "New learner",
      text: "I need careful foundations and short practice loops.",
    },
    {
      value: "some",
      label: "Some experience",
      text: "I know basics and want structured progression.",
    },
    {
      value: "working",
      label: "Working developer",
      text: "I want advanced practice, architecture, and review.",
    },
  ];

const goalOptions: Array<{ value: LearningGoal; label: string; text: string }> = [
  {
    value: "foundations",
    label: "Foundations",
    text: "Build reliable programming basics.",
  },
  {
    value: "projects",
    label: "Projects",
    text: "Finish practical browser-safe capstones.",
  },
  { value: "career", label: "Career", text: "Strengthen portfolio-ready coding skills." },
  {
    value: "interview",
    label: "Interview",
    text: "Practice algorithms, reasoning, and debugging.",
  },
];

export default function OnboardingPage() {
  const { state, dispatch } = useProgress();
  const navigate = useNavigate();
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    state.preferences.experienceLevel,
  );
  const [primaryGoal, setPrimaryGoal] = useState<LearningGoal>(
    state.preferences.primaryGoal,
  );
  const [preferredTrackId, setPreferredTrackId] = useState(
    state.preferences.preferredTrackId ?? tracks[0]?.id ?? "python",
  );
  const [weeklyLessonGoal, setWeeklyLessonGoal] = useState(
    state.preferences.weeklyLessonGoal,
  );
  const [visualMode, setVisualMode] = useState<UserPreferences["visualMode"]>(
    state.preferences.visualMode,
  );
  const [reducedMotion, setReducedMotion] = useState(state.preferences.reducedMotion);

  const finish = () => {
    dispatch({
      type: "complete-onboarding",
      experienceLevel,
      primaryGoal,
      preferredTrackId,
      weeklyLessonGoal,
      visualMode,
      reducedMotion,
    });
    navigate(`/tracks/${preferredTrackId}`);
  };

  return (
    <main id="main-content" className="onboarding-page page-shell">
      <header className="page-hero compact-hero">
        <p className="eyebrow">Observatory calibration / optional</p>
        <h1>Calibrate NEXUS CODE v5 around your learning path.</h1>
        <p>
          This does not block the archive. It stores local preferences for recommendation
          language, weekly targets, visual depth, and your preferred starting expedition.
        </p>
      </header>

      <div className="onboarding-grid">
        <section className="onboarding-panel">
          <h2>
            <Gauge aria-hidden="true" /> Experience level
          </h2>
          <div className="choice-grid">
            {experienceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={experienceLevel === option.value ? "is-selected" : ""}
                onClick={() => setExperienceLevel(option.value)}
              >
                <strong>{option.label}</strong>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="onboarding-panel">
          <h2>
            <Goal aria-hidden="true" /> Primary goal
          </h2>
          <div className="choice-grid two-column">
            {goalOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={primaryGoal === option.value ? "is-selected" : ""}
                onClick={() => setPrimaryGoal(option.value)}
              >
                <strong>{option.label}</strong>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="onboarding-panel">
          <h2>
            <Sparkles aria-hidden="true" /> Starting expedition
          </h2>
          <label>
            Choose a primary track
            <select
              value={preferredTrackId}
              onChange={(event) => setPreferredTrackId(event.target.value)}
            >
              {tracks.map((track) => (
                <option key={track.id} value={track.id}>
                  {track.language} — {track.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Weekly lesson target
            <input
              type="range"
              min="1"
              max="14"
              value={weeklyLessonGoal}
              onChange={(event) => setWeeklyLessonGoal(Number(event.target.value))}
            />
            <strong>{weeklyLessonGoal} lessons per week</strong>
          </label>
        </section>

        <section className="onboarding-panel">
          <h2>
            <Eye aria-hidden="true" /> Visual comfort
          </h2>
          <label>
            Visual mode
            <select
              value={visualMode}
              onChange={(event) =>
                setVisualMode(event.target.value as UserPreferences["visualMode"])
              }
            >
              <option value="adaptive">Adaptive</option>
              <option value="minimal">Minimal</option>
              <option value="immersive">Immersive</option>
            </select>
          </label>
          <label className="switch-row">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(event) => setReducedMotion(event.target.checked)}
            />
            Reduce motion-sensitive effects
          </label>
        </section>
      </div>

      <div className="onboarding-actions">
        <button className="button button-primary" type="button" onClick={finish}>
          <CheckCircle2 aria-hidden="true" /> Save calibration{" "}
          <ArrowRight aria-hidden="true" />
        </button>
        <Link className="button button-secondary" to="/tracks">
          Skip and explore tracks
        </Link>
      </div>
    </main>
  );
}
