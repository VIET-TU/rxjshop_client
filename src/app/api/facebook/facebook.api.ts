import axios from 'axios'

const APP_ID = '2480363275505396'
const APP_SECRET = 'd2120330b29f99f5a6a505cfe7f3c137'

export default async function handler(token: string) {
	const appAccessToken = await getAppAccessToken()
	const scopes = await debugToken(appAccessToken, token)
	console.log('scope', scopes)

	return appAccessToken
}

export const getAppAccessToken = async () => {
	const res = await axios.get(
		`https://graph.facebook.com/oauth/access_token?client_id=2480363275505396&client_secret=d2120330b29f99f5a6a505cfe7f3c137&grant_type=client_credentials`
	)

	const data: { access_token: string } = await res.data
	console.log('data', data)
	return data.access_token
}

export const debugToken = async (appAccessToken: string, token: string) => {
	const res = await axios.get(
		`https://graph.facebook.com/v19.0/debug_token?input_token=${token}&access_token=${appAccessToken}`
	)

	const data: { data: { scopes: string[] } } = await res.data
	console.log('data debug', data)
	return data.data.scopes
}
