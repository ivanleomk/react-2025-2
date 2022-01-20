import { auth } from '@/lib/firebase-admin';
import { getAllFeedbackForSites } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { feedback } = await getAllFeedbackForSites(uid);

    res.status(200).json({ feedback });
  } catch (error) {
    console.log(error.message);
    // logger.error(
    //   {
    //     request: {
    //       headers: formatObjectKeys(req.headers),
    //       url: req.url,
    //       method: req.method
    //     },
    //     response: {
    //       statusCode: res.statusCode
    //     }
    //   },
    //   error.message
    // );

    res.status(500).json({ error });
  }
};
