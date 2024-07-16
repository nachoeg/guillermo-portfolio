import { toast } from "sonner";
import Compressor from "compressorjs";

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

async function uploadImages(
  files: FileList,
  id: number,
  compress: boolean = true,
  quality: number = 0.4
) {
  for (const image of files) {
    const formData = new FormData();
    if (compress) {
      const compressedBlob = await new Promise((resolve, reject) => {
        new Compressor(image, {
          quality: quality,
          success(result) {
            resolve(result);
          },
          error(err) {
            toast.error(err.message);
            reject(err);
          },
        });
      });
      formData.append("file", compressedBlob as Blob);
    } else {
      formData.append("file", image);
    }
    formData.append("projectId", id.toString());
    try {
      const response = await fetch("/api/project/uploadImage", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        toast.success("Imagen subida");
      } else {
        toast.error("Error al subir imagen");
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export {
  validateImageSize,
  validateImageType,
  uploadImages,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
};
