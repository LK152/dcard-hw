import type { NextPage } from 'next';
import Table from '@components/Table';

const Home: NextPage = () => {
	return (
		<div className='w-full h-full bg-white'>
			<Table />
		</div>
	);
};

export default Home;
