import { FC } from 'react';
import Link from 'next/link';

const IssueTab: FC<{ id: number; title: string }> = ({ id, title }) => {
	return (
		<Link href={`/issue/${id}`}>
			<div className='w-full h-20 border-2 border-b-slate-400 hover:cursor-pointer'>
				<span className='text-4xl p-2'>{title}</span>
			</div>
		</Link>
	);
};

export default IssueTab;
