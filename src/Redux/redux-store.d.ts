declare module './store' {
    import { Store } from 'redux';
    import { RootState } from './rootReducer'; // rootReducer에서 RootState 타입을 가져와야 합니다.
  
    const store: Store<RootState>;
  
    export default store;
  }