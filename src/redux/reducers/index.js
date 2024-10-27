import { combineReducers } from 'redux';
import chatReducer from './chat';
import currentUserReducer from './current_user';
import editorReducer from './editor';

const rootReducer = combineReducers({
    chat: chatReducer,
    currentUser: currentUserReducer,
    editor: editorReducer
  });
  
  export default rootReducer;