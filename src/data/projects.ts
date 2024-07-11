import { supabase } from "../lib/supabase";

const getProjects = async (): Promise<Project[]> => {
  const { data: projects, error: errorProjects } = await supabase
    .from("projects")
    .select("*");
  if (errorProjects) console.error("error", errorProjects);

  const { data: images, error: errorImages } = await supabase
    .from("images")
    .select("*");
  if (errorImages) console.error("error", errorImages);

  const updatedProjects = projects
    ? projects.map((project) => {
        const projectImages = images
          ? images
              .filter((image) => image.project === project.id)
              .sort((a, b) => a.created_at.localeCompare(b.created_at))
          : [];
        if (projectImages.length === 0) {
          projectImages.push({
            created_at: "",
            id: "",
            project: 0,
            url: `https://placehold.co/600x400?text=${
              project.title != "" ? project.title : "Proyecto " + project.id
            }`,
          });
        }
        return { ...project, images: projectImages };
      })
    : [];
  return updatedProjects.sort((a, b) =>
    a.created_at.localeCompare(b.created_at)
  );
};

export default getProjects;
