// import birthChartGen function

export default function handler(req, res) {
  if (req.method === 'GET') {
    // search for userId in birthChart model

    res.status(200).json({ 
      sunSign: 'aries',
      moonSign: 'aries',
      risingSign: 'leo'
    })
  } else if (req.method === 'POST') {
    // search for userId in birthChart model

    // update model

  } else if (req.method ===  'PUT') {
    // search for userId in birthChart model
  }
}