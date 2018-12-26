import Amplify from 'aws-amplify';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-virtualized/styles.css';
import App from './App';
import aws_exports from './aws-exports';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

Amplify.configure(aws_exports);

registerServiceWorker();

const render = (Component: typeof React.Component) => ReactDOM.render(
  <Component />,
  document.getElementById('root') as HTMLElement
);

render(App);

if (process.env.NODE_ENV === 'development') {
  import('why-did-you-update')
    .then(({ whyDidYouUpdate }) => {
      whyDidYouUpdate(React, {
        exclude: RegExp(/^(Switch|Router|Route|Link)$/)
      });
    });
}

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(NextApp);
  });
}
