const supabase = require('../utils/supabaseClient');

const uploadLogo = async (req, res) => {
  const file = req.file;
  const filename = `${Date.now()}_${file.originalname}`;

  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) return res.status(500).json({ message: 'Upload failed', error });

  const { publicURL } = supabase.storage.from('logos').getPublicUrl(filename);
  res.json({ url: publicURL });
};

module.exports = { uploadLogo };
