import { v4 as uuid } from "uuid";
import { connection } from "../database";

export async function postURL(req, res) {
  const { url } = req.body;

  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
  try {
    const users = await connection.query(
      'SELECT "userId" FROM sessions WHERE token = $1',
      [token]
    );

    if (users.rowCount === 0) {
      return res.sendStatus(404);
    }
    const userId = rows[0];
    const shortUrl = uuid().split("-")[0];
    await connection.query(
      `INSERT INTO "shortUrl"("shortUrl", url, "userId"), 
            VALUES ($1, $2, $3)`,
      [shortUrl, url, userId]
    );
    return res.status(201).send(shortUrl);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const result = await connection.query(`
          SELECT s.id, s.shortUrl, s.url FROM "shortUrls" s WHERE "shortUrl" = $1`,
          [shortUrl]
          );

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result.rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
}

