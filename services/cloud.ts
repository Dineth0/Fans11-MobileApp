export const uploadToCloudinary = async (
  base64Image: string,
): Promise<string | null> => {
  const cloudName = "dog4tfjaf";
  const uploadPreset = "fans11";
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", base64Image);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    }
    return null;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
