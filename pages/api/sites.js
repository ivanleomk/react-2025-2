import { db, auth } from '@/lib/firebase-admin';
import { getAllSites, getAllSitesForUser } from '@/lib/db-admin';

export default async (req, res) => {
  const { token } = req.headers;
  return auth
    .verifyIdToken(token)
    .then((res) => {
      const { uid } = res;
      return getAllSitesForUser(uid);
    })
    .then(({ sites, error }) => {
      if (error) {
        res.status(500).json({ error });
      }

      res.status(200).json({ sites });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
