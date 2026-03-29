const API_BASE = "https://f1vfn6o1y7.execute-api.ap-south-1.amazonaws.com";

const BUCKET_URL = "https://harsh-image-project-123.s3.amazonaws.com";

const api = {

  // 🔍 SEARCH BY TAG
  searchImages: async (query) => {
    if (!query) return [];

    const response = await fetch(
      `${API_BASE}/search?tag=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(item => ({
      id: item.image_name,
      imageUrl: `${BUCKET_URL}/${item.image_name}`,
      imageName: item.image_name,

      // 🔥 SAFE LABEL HANDLING
      tags: (item.labels || []).map(l => {
        if (typeof l === "string") return l;
        if (l.name) return l.name;
        if (l.Name) return l.Name;
        return "unknown";
      })
    }));
  },

  // 📤 GET PRE-SIGNED URL
  getUploadUrl: async (name, type) => {
    const response = await fetch(
      `${API_BASE}/upload-url?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`,
      {
        method: "POST"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get upload URL");
    }

    return await response.json();
  },

  // 📤 UPLOAD TO S3
  uploadToS3: async (url, file, onProgress) => {
    const res = await fetch(url, {
      method: "PUT",
      body: file
    });

    if (!res.ok) {
      throw new Error("Upload to S3 failed");
    }

    if (onProgress) onProgress(100);
  }

};

export default api;