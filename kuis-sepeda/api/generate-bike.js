export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1'
          }
        })
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    // Mengubah format gambar base64 dari Google menjadi URL yang bisa dibaca browser
    const base64Image = data.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    return res.status(200).json({ imageUrl });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
