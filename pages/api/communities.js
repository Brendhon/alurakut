// eslint-disable-next-line import/no-extraneous-dependencies
import { SiteClient } from 'datocms-client';

export default async function receiveRequest(req, resp) {
  // Desestruturando os dados do corpo da requisição
  const { title, imageUrl, creatorSlug } = req.body;

  if (req.method !== 'POST') {
    return resp
      .status(404)
      .json({ message: 'So é aceito requisições tipo POST' });
  }

  const TOKEN = '0cabd1c4739bffd7d4d090c6708e47';
  const client = new SiteClient(TOKEN);

  const record = await client.items.create({
    // ID - Criado pelo Dato de forma automática
    itemType: '968433', // model ID
    title,
    imageUrl,
    creatorSlug,
  });

  return resp.json({ data: record });
}
