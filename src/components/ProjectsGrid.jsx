import PROJECTS from "@/data/projects.js";
import { Project } from "@/components/Project";
import { useStore } from "@nanostores/react";
import { tagStore } from "../store.js";

export function ProjectsGrid() {
  const selectedTag = useStore(tagStore);
  function filterProjects() {
    if (selectedTag === "Todo") {
      return PROJECTS;
    } else {
      return PROJECTS.filter((project) => project.tags.includes(selectedTag));
    }
  }

  const filteredProjects = filterProjects();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProjects.map((project, index) => (
        <Project key={index} data={project} />
      ))}
    </div>
  );
}

// export function ProjectsGrid() {
//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {projects.map((project, index) => (
//         <Project key={index} data={project} client:load />
//       ))}
//     </div>
//   );
// }
