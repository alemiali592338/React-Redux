import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { loadCourses } from './actions/courseActions';
import { loadAuthors } from './actions/authorActions';
import MainContainer from './MainContainer';
import { Router, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Routs from './routs';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
    <AppContainer>
        <MainContainer>
            <Provider store={store}>
                <Router history={browserHistory} routes={Routs} />
            </Provider>
        </MainContainer>
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./MainContainer', () => {
        render(
            <AppContainer>
                <MainContainer>
                    <Provider store={store}>
                        <Router history={browserHistory} routes={Routs} />
                    </Provider>
                </MainContainer>
            </AppContainer>,
            document.getElementById('app')
        );
    })
}