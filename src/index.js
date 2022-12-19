import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
console.log(container.title);
const root = createRoot(container);
root.render(
	<React.StrictMode >
		<App />
	</React.StrictMode>
);