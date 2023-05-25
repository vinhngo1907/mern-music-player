export function loadQueueState() {
	try {
		const serializeQueueState = localStorage.getItem('queueState');
		if (!serializeQueueState) return undefined;

		return JSON.parse(serializeQueueState);
	} catch (error) {
		return undefined;
	}
}

export function saveQueueState(state) {
	try {
		const serializeQueueState = JSON.stringify(state.queueState);
		localStorage.setItem('queueState', serializeQueueState);
	} catch (error) {
		// ignore
	}
}

export function loadUserData() {
	try {
		serializeUserData = localStorage.getItem('user');
		if (!serializeUserData) return undefined;

		return JSON.parse(serializeUserData);
	} catch (error) {
		return undefined;
	}
}