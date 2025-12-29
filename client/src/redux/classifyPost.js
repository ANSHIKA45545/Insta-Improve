const classifyPost = async (post) => {
  try {
    const res = await fetch("http://127.0.0.1:5001/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: post.caption || "",
        image_url: post.image.startsWith("http") ? post.image : `http://localhost:5000/${post.image}`,
      }),
    });
    const data = await res.json();
    return data.category || "Uncategorized";
  } catch (err) {
    console.error("ML classify error:", err);
    return "Uncategorized";
  }
};


export default classifyPost;