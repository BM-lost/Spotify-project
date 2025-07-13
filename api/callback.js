export default async function handler(req, res) {  
  const code = req.query.code || null;  
  const client_id = "98f6b66d667c44c9a155559bf87b63ae";  
  const client_secret = "99544b185a7b4abd8d0f1b45afbe70c5";  
  const redirect_uri = "https://spotify-project-bay-gamma.vercel.app/api/callback";  

  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    })
  };

  const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
  const data = await response.json();

  if (data.access_token) {
    res.redirect(`https://spotify-project-bay-gamma.vercel.app/?access_token=${data.access_token}`);
  } else {
    res.status(400).json({ error: "No se pudo obtener el token", details: data });
  }
}
