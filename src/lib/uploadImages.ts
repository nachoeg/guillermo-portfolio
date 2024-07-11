import { toast } from "sonner";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const validateImageSize = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }
  }
  return true;
};

const validateImageType = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return false;
    }
  }
  return true;
};

async function uploadImages(files: FileList, id: number) {
  for (const image of files) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("projectId", id.toString());
    try {
      const response = await fetch("/api/project/uploadImage", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        toast.success("Imagen subida");
      } else {
        toast.error("Error al subir imagen");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function uploadImagesWithCompression(files: FileList) {
  const images: string[] = [];
  for (const image of files) {
    console.log(image.size);
    await new Promise<void>((resolve, reject) => {
      new Compressor(image, {
        quality: 0.6,
        success(result) {
          console.log(result.size);
          const formData = new FormData();
          formData.append("file", result);
          fetch("/api/project/uploadProject", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (response.ok) {
                response.text().then((url) => {
                  images.push(url);
                  toast.success("Imagen subida");
                  resolve();
                });
              } else {
                toast.error("Error al subir imagen");
                reject();
              }
            })
            .catch((error) => {
              console.log(error);
              reject();
            });
        },
        error(err) {
          console.log(err.message);
          reject();
        },
      });
    });
  }
  return images;
}

export {
  validateImageSize,
  validateImageType,
  uploadImages,
  uploadImagesWithCompression,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
};
