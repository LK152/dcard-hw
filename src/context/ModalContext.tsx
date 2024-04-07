'use client';

import { FC, createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { AuthRequiredError } from '@lib/exceptions';

interface ModalContextType {
	userData: UserData | null;
	setUser: (e: UserData | null) => void;
	issues: IssueProps[];
	setIssues: (e: IssueProps[]) => void;
	page: number;
	setPage: (e: number) => void;
}

const ModalContext = createContext<ModalContextType>({
	userData: null,
	issues: [],
	page: 1,
	setUser: () => {},
	setIssues: () => {},
	setPage: () => {},
});

const ModalProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userData, setUser] = useState<UserData | null>(null);
	const [issues, setIssues] = useState<IssueProps[]>([]);
	const [page, setPage] = useState<number>(1);
	const [isEnd, setEnd] = useState<boolean>(false);
	const code = useSearchParams().get('code') ?? null;

	useEffect(() => {
		axios
			.post('http://localhost:3000/api/auth', { code })
			.then((res) => {
				setUser(res.data.userData);
			})
	}, []);

	useEffect(() => {
		if (!isEnd)
			axios
				.get(
					`http://localhost:3000/api/issues?per_page=10&state=all&page=${page}`
				)
				.then((res) => {
					if (res.data.issues.length == 0) setEnd(true);
					setIssues(issues.concat(res.data.issues));
				});
	}, [isEnd, page]);

	const value = { userData, issues, page, setUser, setIssues, setPage };

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

export const useModalContext = () => useContext(ModalContext);
export default ModalProvider;
