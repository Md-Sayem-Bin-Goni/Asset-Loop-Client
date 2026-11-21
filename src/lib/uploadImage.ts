import axios from "axios";

export const uploadImageToImgBB = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey || apiKey === "your_imgbb_api_key_here") {
    throw new Error("ImgBB API key is missing in .env.local");
  }

  const cleanFileName = imageFile.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-");
  const prefixedName = `assetloop-${cleanFileName}-${Date.now()}`;

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}&name=${encodeURIComponent(prefixedName)}`,
    formData
  );

  if (response.data?.success) {
    return response.data.data.display_url;
  }
  throw new Error("Image upload failed");
};