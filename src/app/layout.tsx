import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@components/Navbar';
import ModalProvider from '@context/ModalContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '2024 Dcard HW',
	description: 'By Luke Wu',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ModalProvider>
					<Navbar />
					{children}
				</ModalProvider>
			</body>
		</html>
	);
};

export default RootLayout;
