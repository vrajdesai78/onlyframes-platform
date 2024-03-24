export default async function handler(req: any, res: any) {
  const url = `https://app.dynamicauth.com/api/v0/environments/${process.env.NEXT_PUBLIC_DYNAMIC_APP_KEY}/gates`;
  const body = req.body;
  console.log(body);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DYNAMIC_TOKEN}`,
      },
      body: body,
    });
    console.log(response.status);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}
