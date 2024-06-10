import { useMemo } from 'react';
import analytics from '../media/analytics.svg';
import banners from '../media/banners.svg';
import blog from '../media/blog.svg';
import chats from '../media/chats.svg';
import logout from '../media/logout.svg';
import logo from '../media/logo.svg';
import moderation from '../media/moderation.svg';
import profile from '../media/profile.svg';
import rates from '../media/rates.svg';
import team from '../media/team.svg';
import { PanelItem } from '../utils/interfaces';

const Panel: React.FC = () => {
	const LogoPic = () => (
		<img
			src={logo}
			alt='Логотип'
		/>
	);

	const ProfilePic = () => (
		<img
			src={profile}
			alt='Профиль'
		/>
	);

	const menuItems: PanelItem[] = useMemo(
		() => [
			{ title: 'Аналитика', image: analytics },
			{ title: 'Профиль', image: profile },
			{ title: 'Модерация', image: moderation },
			{ title: 'Чаты', image: chats },
			{ title: 'Баннеры', image: banners },
			{ title: 'Команда', image: team },
			{ title: 'Блог', image: blog },
			{ title: 'Курс валют', image: rates },
			{ title: 'Выйти', image: logout },
		],
		[]
	);

	return (
		<div className='panel-wrapper'>
			<LogoPic />
			<ProfilePic />
			{menuItems.map((item: PanelItem) => (
				<div
					className='panel-item'
					key={item.title}
				>
					<img
						src={item.image}
						alt='Элемент'
					/>
				</div>
			))}
		</div>
	);
};

export default Panel;
