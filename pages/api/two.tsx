import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(request: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({ message: 'Hello from Next.js! two tsx' })
}
