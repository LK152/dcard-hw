'use client';

import axios from 'axios';
import Link from 'next/link';
import { FC } from 'react';

const CloseButton: FC<{ issue: IssueProps }> = ({ issue }) => {

	const handleSubmit = () => {
		axios.delete(`http://localhost:3000/api/issues?id=${issue.number}`);
	};

	return (
		<Link
			href='/'
			onClick={handleSubmit}
			className='bg-[#3397CF] rounded p-2 hover:bg-[#5AB0DB] transition-colors ease-hover-transition duration-600'
		>
			<span>Delete</span>
		</Link>
	);
};

export default CloseButton;
