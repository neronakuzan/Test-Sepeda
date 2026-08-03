export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    
    // Bikin URL gambar AI secara langsung tanpa butuh API Key
    const encodedPrompt = encodeURIComponent(prompt);
    const randomSeed = Math.floor(Math.random() * 999999);
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;

    return res.status(200).json({ imageUrl });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
