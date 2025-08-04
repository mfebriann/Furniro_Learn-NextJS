import type { Metadata } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const fontPoppins = Poppins({
	variable: '--font-poppins-sans',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const fontMontserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Furniro - Learn NextJS',
	description: 'Learn Next.js with build Furniro',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${fontPoppins.variable} ${fontMontserrat.variable} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
