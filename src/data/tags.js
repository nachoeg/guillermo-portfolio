import PROJECTS from "./projects";

const TAGS = ["Todo", ...new Set(PROJECTS.flatMap((project) => project.tags))];

export default TAGS;
