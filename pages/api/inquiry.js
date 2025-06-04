import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { listing_id, name, email, message } = req.body;
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{ listing_id, name, email, message }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: 'Inquiry submitted' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
