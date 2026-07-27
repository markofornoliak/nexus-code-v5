import { projects } from "../../content/projects";
import { getOrderedLessons, tracks } from "../../content/registry";
import type { StoredApplicationState, Track } from "../../types";
import { isLessonUnlocked, selectContinueLesson } from "../progress/progressSelectors";

export interface LearningRecommendation {
  title: string;
  route: string;
  label: string;
  reason: string;
  kind: "lesson" | "project" | "review";
}

function preferredTrack(state: StoredApplicationState): Track | undefined {
  return (
    tracks.find(
      (track) =>
        track.id === state.preferences.preferredTrackId && track.status === "available",
    ) ?? tracks.find((track) => track.status === "available")
  );
}

export function getPrimaryRecommendation(
  state: StoredApplicationState,
): LearningRecommendation {
  const activeProject = projects.find((project) => {
    const progress = state.projectProgress[project.id];
    return progress && !progress.isCompleted && progress.completedMilestoneIds.length > 0;
  });

  if (activeProject) {
    return {
      title: activeProject.title,
      route: "/projects",
      label: "Return to project",
      reason: `Continue because ${activeProject.title} has unfinished milestones saved locally.`,
      kind: "project",
    };
  }

  const continuation = selectContinueLesson(state.progress);
  if (continuation) {
    return {
      title: continuation.lesson.title,
      route: `/learn/${continuation.track.id}/${continuation.lesson.id}`,
      label: `Continue ${continuation.track.language}`,
      reason: `Continue because this is your next unlocked ${continuation.track.language} lesson.`,
      kind: "lesson",
    };
  }

  const track = preferredTrack(state);
  const reviewLesson = track
    ? getOrderedLessons(track).find(
        (lesson) =>
          lesson.status === "available" &&
          !state.progress.lessons[lesson.id]?.isCompleted &&
          isLessonUnlocked(track, lesson.id, state.progress),
      )
    : undefined;

  if (track && reviewLesson) {
    return {
      title: reviewLesson.title,
      route: `/learn/${track.id}/${reviewLesson.id}`,
      label: `Start ${track.language}`,
      reason: `Start here because your preferred track is ${track.language} and the prerequisite path is open.`,
      kind: "lesson",
    };
  }

  return {
    title: "Project forge",
    route: "/projects",
    label: "Open projects",
    reason:
      "Open projects because all immediately available lesson recommendations are complete.",
    kind: "project",
  };
}
