import { atom } from "nanostores";
import getProjects from "./data/projects";
import getTags from "./data/tags";

export const tagStore = atom("Todo");
export const tagsStore = atom(await getTags());
export const projectsStore = atom(await getProjects());
