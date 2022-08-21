import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, {onNavigate, defaultHistory}) => {
    const history = defaultHistory || createMemoryHistory({ initialEntries: [window.location.pathname]});

    if(onNavigate){
        console.log(history)
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history} />,
        el
    )

    return {
        onParentNavigate: (location) => {
            const { pathname: nextPathname } = location;
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector("#_marketing_dev_root");

    if (devRoot) {
        mount(devRoot, {defaultHistory: createBrowserHistory()})
    }

}

export {mount};