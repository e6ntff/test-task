export type PanelItem = { title: string; image: string };

export interface User {
	id: number;
	name: string;
	email: string;
	permissions: string[];
	image: string;
}
