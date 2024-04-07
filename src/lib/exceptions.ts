export class AuthRequiredError extends Error {
	constructor(msg = 'Auth is required to access this page.') {
		super(msg);
		this.name = 'AuthRequiredError';
	}
}
