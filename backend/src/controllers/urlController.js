import { generateShortId } from "../utils/generateShortId.js";
import { createUrl, findUrlByShortId, incrementClicks, getAllUrls } from "../models/urlModel.js";

export const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: "URL is required" });

    const shortId = generateShortId();
    const newUrl = await createUrl(shortId, originalUrl);

    return res.json({
      message: "URL shortened successfully",
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
      data: newUrl
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  try {
    const urlData = await findUrlByShortId(shortId);
    if (!urlData) return res.status(404).send("Not Found");

    await incrementClicks(shortId);
    return res.redirect(urlData.original_url);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const listUrls = async (req, res) => {
  try {
    const urls = await getAllUrls();
    return res.json(urls);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
