export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'eva'})

  } else if (req.method === 'POST') {
    res.status(200).json({ name: 'yo'})
    
  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}