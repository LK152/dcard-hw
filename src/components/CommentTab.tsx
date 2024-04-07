import { FC } from 'react';

const CommentTab: FC<{ user: UserData; body: string }> = ({ user, body }) => {
	return (
		<div className='w-full h-20 m-4'>
			<span>{user.login}:</span>
			<span className='text-xl p-2'>{body}</span>
		</div>
	);
};

export default CommentTab;
