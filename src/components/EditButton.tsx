'use client';

import axios from 'axios';
import { FC, useState } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';

Modal.setAppElement('html');

const style = {
	content: {
		width: '600px',
		height: 'auto',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const EditButton: FC<{ issue: IssueProps }> = ({ issue }) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(issue.title);
	const [body, setBody] = useState<string>(issue.body);
	const [wordCnt, setWordCnt] = useState<number>(issue.body.length);
	const [warning, setWarning] = useState<boolean>(false);

	const openModal = () => setOpen(true);

	const closeModal = () => setOpen(false);

	const handleSubmit = () => {
		const payload = {
			id: issue.number,
			title,
			body,
		};
		axios.patch('http://localhost:3000/api/issues', payload)
		setTitle('');
		setBody('');
		setWarning(false);
		setOpen(false);
	};

	const wordLimit = () => setWarning(true);

	return (
		<>
			<button
				onClick={openModal}
				className='bg-[#3397CF] rounded p-2 hover:bg-[#5AB0DB] transition-colors ease-hover-transition duration-600'
			>
				<span>Edit</span>
			</button>
			<Modal isOpen={isOpen} onRequestClose={closeModal} style={style}>
				<div className='h-full flex flex-col items-center'>
					<span className='text-4xl m-8'>Create An Issue</span>
					<div className='px-8 py-2 w-80'>
						<label>Title</label>
						<textarea
							className='w-full border-solid border-dcard-blue border-2 rounded'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							rows={1}
						/>
					</div>
					<div className='p-8 w-80'>
						<label>Body</label>
						<textarea
							className='w-full border-solid border-dcard-blue border-2 rounded h-24'
							value={body}
							onChange={(e) => {
								setBody(e.target.value);
								setWordCnt(e.target.value.length);
							}}
							rows={4}
						/>
						<span className='text-xs'>{wordCnt}/30</span>
					</div>
					<Link
						href='/'
						className='w-fit m-8 bg-[#3397CF] rounded p-2 hover:bg-[#5AB0DB] transition-colors ease-hover-transition duration-600'
						onClick={wordCnt >= 30 ? handleSubmit : wordLimit}
					>
						<span className='text-xl p-2 text-white'>Update</span>
					</Link>
					{warning && (
						<span className='text-sm text-red-600'>
							Body needs to be at least 30 characters long
						</span>
					)}
				</div>
			</Modal>
		</>
	);
};

export default EditButton;
