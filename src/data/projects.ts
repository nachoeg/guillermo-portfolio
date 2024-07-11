import { supabase } from "../lib/supabase";

const getProjects = async (): Promise<Project[]> => {
  const { data: projects, error: errorProjects } = await supabase
    .from("projects")
    .select("*");
  if (errorProjects) console.error("error", errorProjects);
  console.log(projects);
  const { data: images, error: errorImages } = await supabase
    .from("images")
    .select("*");
  if (errorImages) console.error("error", errorImages);
  console.log(images);

  const updatedProjects = projects
    ? projects.map((project) => {
        const projectImages = images
          ? images.filter((image) => image.project === project.id)
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
  console.log(updatedProjects);
  return updatedProjects;
};

export default getProjects;
