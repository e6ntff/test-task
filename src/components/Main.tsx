import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from 'react';
import initialUsers from '../users';
import noImage from '../media/noImage.svg';
import dots from '../media/dots.svg';
import { User } from '../utils/interfaces';

const defaultUser: User = {
	id: 0,
	name: 'Пользователь',
	email: 'example@email.com',
	permissions: [],
	image: '',
};

const Main: React.FC = () => {
	const [users, setUsers] = useState<User[]>(initialUsers);
	const [query, setQuery] = useState<string>('');

	const search = useCallback(
		({ email }: User) => email.toLowerCase().includes(query.toLowerCase()),
		[query]
	);

	const addUser = useCallback(() => {
		setUsers((prevUsers: User[]) => [
			{ ...defaultUser, id: Math.random() },
			...prevUsers,
		]);
	}, [setUsers]);

	return (
		<div className='main-wrapper'>
			<div className='main'>
				<div className='main-header'>
					<h2 className='main-title'>Команда</h2>
					<div className='search-container'>
						<Search
							value={query}
							onChange={setQuery}
						/>
						<Button add={addUser} />
					</div>
				</div>
				{users.filter(search).map((user: User) => (
					<Item
						key={user.id}
						user={user}
						setUsers={setUsers}
					/>
				))}
			</div>
		</div>
	);
};

interface ItemProps {
	user: User;
	setUsers: Dispatch<SetStateAction<User[]>>;
}

const Item: React.FC<ItemProps> = ({ user, setUsers }) => {
	const { id, name, email, image } = user;

	const [permissions, setPermissions] = useState<string[]>(user.permissions);

	const deleteItem = useCallback(
		() =>
			setUsers((prevUsers: User[]) =>
				prevUsers.filter(({ id: userId }: User) => id !== userId)
			),
		[setUsers, id]
	);

	return (
		<div className='item-wrapper'>
			<div
				className='user-image'
				style={{ backgroundImage: `url(${image ? image : noImage})` }}
			></div>
			<div className='text-wrapper'>
				<span className='name-wrapper'>
					<p className='user-name'>{name}</p>
					<p className='user-email'>{email}</p>
				</span>
				<span className='user-permissions'>
					{permissions.map((permission: string) => (
						<p
							key={permission}
							className={`user-permission ${
								permission === 'Администратор' ? ' permission-admin' : ''
							}`}
						>
							{permission}
						</p>
					))}
				</span>
			</div>
			<img
				src={dots}
				alt=''
				className='user-dots'
			/>
			<Menu
				deleteItem={deleteItem}
				permissions={permissions}
				setPermissions={setPermissions}
			/>
		</div>
	);
};

interface SearchProps {
	value: string;
	onChange: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
	return (
		<input
			className='input'
			placeholder='Поиск по Email'
			type='text'
			value={value}
			onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
				onChange(target.value)
			}
		/>
	);
};

interface ButtonProps {
	add: () => void;
}

const Button: React.FC<ButtonProps> = ({ add }) => {
	return (
		<button
			className='button'
			onClick={add}
		>
			Добавить пользователя
		</button>
	);
};

interface MenuProps {
	permissions: string[];
	setPermissions: Dispatch<SetStateAction<string[]>>;
	deleteItem: () => void;
}

const Menu: React.FC<MenuProps> = ({
	deleteItem,
	permissions,
	setPermissions,
}) => {
	const items = [
		{
			title: 'Изменить права доступа',
			className: 'perm-changer',
			children: (
				<Permissions
					permissions={permissions}
					setPermissions={setPermissions}
				/>
			),
		},
		{ title: 'Отправить код повторно' },
		{ title: 'Удалить', onClick: deleteItem },
	];

	return (
		<div className='menu-container'>
			<div className='menu'>
				{items.map(({ title, className, onClick, children }) => (
					<p
						key={title}
						className={className}
						onClick={onClick}
					>
						{title}
						{children}
					</p>
				))}
			</div>
		</div>
	);
};

interface PermissionsProps {
	permissions: string[];
	setPermissions: Dispatch<SetStateAction<string[]>>;
}

const Permissions: React.FC<PermissionsProps> = ({
	permissions,
	setPermissions,
}) => {
	const items = useMemo(
		() => [
			'Модерация объявлений',
			'Блог',
			'Тех. поддержка',
			'Обращения клиентов',
			'Аналитика',
			'Акции',
		],
		[]
	);

	const allActive = useMemo(
		() =>
			permissions.filter((perm: string) => items.includes(perm)).length ===
			items.length,
		[permissions, items]
	);

	const handlePermissionsChanging = useCallback(
		({ target }: React.ChangeEvent<HTMLInputElement>) => {
			const { id, checked } = target;
			if (id === 'all') {
				setPermissions(
					checked
						? Array.from(new Set([...permissions, ...items]))
						: permissions.filter((perm: string) => !items.includes(perm))
				);
				return;
			}
			if (checked) {
				setPermissions((prevPermissions: string[]) => [...prevPermissions, id]);
			} else {
				setPermissions((prevPermissions: string[]) =>
					prevPermissions.filter((title: string) => title !== id)
				);
			}
		},
		[items, setPermissions, permissions]
	);

	return (
		<div className='permissions-container'>
			<div className='permissions'>
				<div className='perm-item'>
					<input
						id='all'
						key='all'
						checked={allActive}
						type='checkbox'
						onChange={handlePermissionsChanging}
					/>
					<p>Все</p>
				</div>
				{items.map((item: string) => (
					<div className='perm-item'>
						<input
							id={item}
							key={item}
							checked={permissions.includes(item)}
							type='checkbox'
							onChange={handlePermissionsChanging}
						/>
						<p style={{ opacity: allActive ? 0.5 : 1 }}>{item}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Main;
