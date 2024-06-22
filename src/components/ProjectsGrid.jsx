import { Project } from "@/components/Project";
import { useStore } from "@nanostores/react";
import { tagStore } from "../store.js";

export function ProjectsGrid({ projects }) {
  const selectedTag = useStore(tagStore);
  function filterProjects() {
    if (selectedTag === "Todo") {
      return projects;
    } else {
      return projects.filter((project) => {
        if (project.tags) return project.tags.includes(selectedTag);
      });
    }
  }

  const filteredProjects = filterProjects();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {!filteredProjects || filteredProjects.length === 0 ? (
        <div className="col-span-full h-96 rounded-lg place-content-center text-center text-lg text-neutral-800 dark:text-neutral-300">
          No se encontraron proyectos
        </div>
      ) : (
        filteredProjects.map((project, index) => (
          <Project key={project.id} data={project} index={index} />
        ))
      )}
      {}
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
