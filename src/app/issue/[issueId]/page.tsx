'use client';

import { useModalContext } from '@context/ModalContext';
import { NextPage } from 'next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CommentTab from '@components/CommentTab';
import EditButton from '@components/EditButton';
import CloseButton from '@components/CloseButton';

const Issue: NextPage<{ params: { issueId: number } }> = ({ params }) => {
	const { issues, userData } = useModalContext();
	const issue = issues?.find(({ id }) => id == params.issueId);
	const [comments, setComments] = useState<CommentProps[] | null>(null);

	useEffect(() => {
		if (issue)
			axios.get(issue.comments_url).then((res) => {
				setComments(res.data);
			});
	}, [issue]);

	return (
		<div className='h-[100vh] flex justify-center'>
			<div className='w-[40%] m-8'>
				<div className='h-10 flex flex-row justify-between'>
					<span className='text-3xl'>{issue?.title}</span>
					<div className='flex flex-row'>
						{userData && issue && <EditButton issue={issue} />}
                        <div className='px-4' />
						{userData && issue && <CloseButton issue={issue} />}
					</div>
				</div>
				<div className='border-2 border-slate-400 rounded' />
				<main className='text-lg m-4'>{issue?.body}</main>
				<div className='border-2 border-slate-400 rounded' />
				<span className='text-2xl m-4'>Comments</span>
				{comments &&
					comments.map(({ body, user }, idx) => {
						return <CommentTab user={user} body={body} key={idx} />;
					})}
			</div>
		</div>
	);
};

export default Issue;
