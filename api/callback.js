export default async function handler(req, res) {
  const client_id = "98f6b66d667c44c9a155559bf87b63ae";
  const client_secret = "99544b185a7b4abd8d0f1b45afbe70c5"; // 👈 AQUI debes poner tu Client Secret
  const redirect_uri = "https://spotify-project-bay-gamma.vercel.app/api/callback";

  const code = req.query.code;

  const authOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri
    })
  };

  const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
  const data = await response.json();
  res.status(200).json(data);
}
