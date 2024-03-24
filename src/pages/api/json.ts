import PinataClient from '@pinata/sdk';
const pinata = new PinataClient({pinataJWTKey: process.env.PINATA_JWT});

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const json = req.body;
    console.log(json);
    try {
      const options = {
        pinataMetadata: {
          name: 'json',
        },
      };
      const response = await pinata.pinJSONToIPFS(JSON.parse(json), options);
      const {IpfsHash} = response;
      console.log(IpfsHash);
      return res.status(200).send({
        hash: IpfsHash,
      });
    } catch (e) {
      console.log(e);
      alert('Trouble uploading file');
    }
  }
}
