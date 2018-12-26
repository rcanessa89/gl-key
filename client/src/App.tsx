import { AppRouter } from '@router';
import store from '@store';
import * as React from 'react';
import { Provider } from 'react-redux';
import { fromEvent, Observable } from 'rxjs';

export interface IAppContext {
  windowClickObservable: Observable<Event>
}

export const AppContext = React.createContext<IAppContext>({
  windowClickObservable: fromEvent(window, 'click'),
});

class App extends React.Component {
  public static contextType = AppContext;

  public render() {
    return (
      <Provider store={store}>
        <AppContext.Provider value={this.context}>
          <AppRouter />
        </AppContext.Provider>
      </Provider>
    );
  }
}

export default App;
