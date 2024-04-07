'use client';

import { FC } from 'react';
import IssueTab from './IssueTab';
import { useModalContext } from '@context/ModalContext';

const Table: FC = () => {
	const { issues, setPage, page } = useModalContext();

	const handleScroll = (e: any) => {
		if (
			e.target.scrollHeight - e.target.scrollTop ===
			e.target.clientHeight
		)
			setPage(page + 1);
	};

	return (
		<div className='h-[100vh] flex justify-center'>
			<div
				onScroll={handleScroll}
				className='w-[80%] h-96 border-2 border-b-slate-400 m-8 mt-32 rounded overflow-scroll'
			>
				{issues.length ? (
					issues.map(({ id, title }, idx) => {
						return (
							<div key={idx}>
								<IssueTab id={id} title={title} />
							</div>
						);
					})
				) : (
					<div className='w-full h-full flex items-center justify-center'>
						<span className='text-2xl'>
							No Issues At The Moment
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Table;
