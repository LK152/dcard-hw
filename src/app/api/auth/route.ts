import { AuthRequiredError } from '@lib/exceptions';
import { NextRequest, NextResponse } from 'next/server';
import { sign, decode } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { TOKEN_NAME } from '@constants/index';
import { cookies } from 'next/headers';

interface GithubCallback {
	access_token: string;
	token_type: string;
	scope: string;
}

const secret = process.env.GITHUB_CLIENT_SECRET || '';
const MAX_AGE = 60 * 60 * 2;

export const POST = async (req: NextRequest) => {
	const token = cookies().get(TOKEN_NAME);

	if (token) {
		const { value } = token;
		const data = decode(value);

		return NextResponse.json(data, { status: 200 });
	}

	try {
		const reqBody = await req.json();
		const code: string = reqBody.code;
		const res = await fetch(
			`https://github.com/login/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
			}
		);
		const data: GithubCallback = await res.json();
		const userData = await (
			await fetch('https://api.github.com/user', {
				method: 'GET',
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `bearer ${data.access_token}`,
					'X-GitHub-Api-Version': '2022-11-28',
				},
			})
		).json();
		if (
			userData.message == 'Requires authentication' ||
			userData.message == 'Bad credentials'
		)
			throw new AuthRequiredError();

		const token = sign({ userData, token: data.access_token }, secret, {
			expiresIn: MAX_AGE,
		});

		const serialized = serialize(TOKEN_NAME, token, {
			httpOnly: true,
			maxAge: MAX_AGE,
			sameSite: 'strict',
			path: '/',
			secure: false,
		});

		return new Response(JSON.stringify({ userData }), {
			status: 200,
			headers: {
				'Set-Cookie': serialized,
			},
		});
	} catch (err) {
		return NextResponse.json({ err }, { status: 400 });
	}
};

export const DELETE = async () => {
	try {
		cookies().delete(TOKEN_NAME);

		return new Response(JSON.stringify({ msg: 'Logged Out' }), {
			status: 200,
		});
	} catch (err) {
		return NextResponse.json({ err }, { status: 400 });
	}
};
