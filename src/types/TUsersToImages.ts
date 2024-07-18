export interface TUsersToImages {
	users_to_images: UsersToImages;
	images: Images;
	user: User;
}

export interface UsersToImages {
	userId: string;
	imageId: number;
}

export interface Images {
	id: number;
	unsplashId: string;
	url: string;
	description?: string;
	altDescription: string;
	blurHash: string;
	uploadedAt: string;
}

export interface User {
	id: string;
	username: string;
	email: string;
	passwordHash?: string;
	profileImage: string;
	createdAt: string;
}
