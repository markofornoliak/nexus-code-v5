import { defaultStoredState } from "../../services/storage/schema";
import { getPrimaryRecommendation } from "./recommendations";

describe("local recommendations", () => {
  it("explains the first available lesson for a new learner", () => {
    const recommendation = getPrimaryRecommendation(structuredClone(defaultStoredState));
    expect(recommendation.route).toContain("/learn/");
    expect(recommendation.reason).toMatch(/next unlocked|preferred track/i);
  });

  it("prioritizes unfinished projects with saved milestones", () => {
    const state = structuredClone(defaultStoredState);
    state.projectProgress["python-text-expedition"] = {
      projectId: "python-text-expedition",
      completedMilestoneIds: ["python-expedition-model"],
      isCompleted: false,
      startedAt: "2026-07-27T10:00:00.000Z",
      updatedAt: "2026-07-27T10:00:00.000Z",
    };
    const recommendation = getPrimaryRecommendation(state);
    expect(recommendation.route).toBe("/projects");
    expect(recommendation.reason).toMatch(/unfinished milestones/i);
  });
});
