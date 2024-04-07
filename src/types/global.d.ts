export {};

declare global {
	interface IssueProps {
		id: number;
		title: string;
		body: string;
		state: string;
		comments_url: string;
        number: number;
	}

	interface CommentProps {
		id: number;
		body: string;
		user: UserData;
	}

	type UserData = {
		avatar_url: string;
		id: number;
		login: string;
	};
}
