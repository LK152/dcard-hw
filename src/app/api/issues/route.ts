import { TOKEN_NAME } from '@constants/index';
import { decode } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AuthRequiredError } from '@lib/exceptions';

interface reqProps {
	title: string;
	body?: string;
	id?: string;
}

export const GET = async (req: NextRequest) => {
	const url = new URL(req.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const page = searchParams.get('page');

	try {
		const res = await fetch(
			`https://api.github.com/repos/lk152/dcard-hw/issues?per_page=10&direction=asc&page=${page}`
		);
		const issues = await res.json();

		return NextResponse.json(
			{ msg: 'Issue Listed', issues },
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json({ err }, { status: 401 });
	}
};

export const POST = async (req: NextRequest) => {
	const reqBody: reqProps = await req.json();

	try {
		const token = cookies().get(TOKEN_NAME);
		if (token) {
			const { value } = token;
			const accessToken: any = decode(value);
			await axios.post(
				'https://api.github.com/repos/lk152/dcard-hw/issues',
				{ title: reqBody.title, body: reqBody.body },
				{
					headers: {
						Accept: 'application/vnd.github+json',
						Authorization: `bearer ${accessToken.token}`,
						'X-GitHub-Api-Version': '2022-11-28',
					},
				}
			);

			return NextResponse.json({ msg: 'Issue Created' }, { status: 201 });
		} else throw new AuthRequiredError();
	} catch (err) {
		return NextResponse.json({ err }, { status: 401 });
	}
};

export const PATCH = async (req: NextRequest) => {
	const reqBody: reqProps = await req.json();

	try {
		const token = cookies().get(TOKEN_NAME);
		if (token) {
			const { value } = token;
			const accessToken: any = decode(value);
            
			await axios.patch(
				`https://api.github.com/repos/lk152/dcard-hw/issues/${reqBody.id}`,
				{ title: reqBody.title, body: reqBody.body },
				{
					headers: {
						Accept: 'application/vnd.github+json',
						Authorization: `bearer ${accessToken.token}`,
						'X-GitHub-Api-Version': '2022-11-28',
					},
				}
			);

			return NextResponse.json({ msg: 'Issue Modified' }, { status: 200 });
		} else throw new AuthRequiredError();
	} catch (err) {
		return NextResponse.json({ err }, { status: 400 });
	}
};

export const DELETE = async (req: NextRequest) => {
	const url = new URL(req.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const id = searchParams.get('id');

	try {
		const token = cookies().get(TOKEN_NAME);
		if (token) {
			const { value } = token;
			const accessToken: any = decode(value);
			await axios.patch(
				`https://api.github.com/repos/lk152/dcard-hw/issues/${id}`,
				{ state: 'closed' },
				{
					headers: {
						Accept: 'application/vnd.github+json',
						Authorization: `bearer ${accessToken.token}`,
						'X-GitHub-Api-Version': '2022-11-28',
					},
				}
			);

			return NextResponse.json({ msg: 'Issue Created' }, { status: 200 });
		} else throw new AuthRequiredError();
	} catch (err) {
		return NextResponse.json({ err }, { status: 400 });
	}
};
