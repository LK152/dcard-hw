import { FC } from 'react';
import Image from 'next/image';
import GithubLogo from '@public/github-logo.svg';

const LoginButton: FC = () => {
	return (
		<a
			className='flex flex-row items-center text-black bg-white shadow-lg p-1 rounded hover:bg-slate-100 transition-colors ease-hover-transition duration-600'
			href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=repo`}
		>
			<div className='py-1 pr-1'>
				<Image src={GithubLogo} alt='GitHub Logo' />
			</div>
			<span>Sign In With GitHub</span>
		</a>
	);
};

export default LoginButton;
