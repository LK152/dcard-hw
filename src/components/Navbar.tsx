'use client';

import { FC } from 'react';
import LoginButton from './LoginButton';
import CreateButton from './CreateButton';
import { useModalContext } from '@context/ModalContext';
import Image from 'next/image';
import LogoutImg from '@public/logout.png';
import axios from 'axios';
import Link from 'next/link';

const Navbar: FC = () => {
	const { userData, setUser } = useModalContext();

	const Logout = () => {
		axios.delete('http://localhost:3000/api/auth');
		setUser(null);
		sessionStorage.clear();
	};

	return (
		<nav className='w-full bg-dcard-blue sticky top-0'>
			<ul className='flex flex-row items-center mx-8'>
				<li className='text-3xl p-4 text-white'>
					<Link href='/'>
						<span>GitHub Issue</span>
					</Link>
				</li>
				<li className='flex-grow' />
				{userData && (
					<li>
						<CreateButton />
					</li>
				)}
				<li className='w-10' />
				<li>
					{userData ? (
						<div className='flex flex-row items-center'>
							<span className='text-white'>
								{`Welcome ${userData.login}`}
							</span>
							<Image
								src={userData.avatar_url}
								alt='User Avatar'
								width={36}
								height={36}
								className='rounded-full m-2'
							/>
						</div>
					) : (
						<LoginButton />
					)}
				</li>
				{userData && (
					<button
						className='bg-slate-100 rounded-full w-8 h-8 hover:bg-white transition-colors ease-hover-transition duration-600'
						onClick={Logout}
					>
						<Image
							className='p-2'
							src={LogoutImg}
							alt='Logout Icon'
						/>
					</button>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
