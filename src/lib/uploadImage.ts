import axios from "axios";

export const uploadImageToImgBB = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );

  if (response.data?.success) {
    return response.data.data.display_url;
  }
  throw new Error("Image upload failed");
};