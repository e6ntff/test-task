import React from 'react';
import Panel from './components/Panel';
import Main from './components/Main';

const App: React.FC = () => {
	return (
		<div className='wrapper'>
			<Panel />
			<Main />
		</div>
	);
};

export default App;
