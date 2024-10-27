import { combineReducers } from 'redux';
import chatReducer from './chat';
import currentUserReducer from './current_user';
import editorReducer from './editor';
import sentimentReducer from './sentiment';

const rootReducer = combineReducers({
    chat: chatReducer,
    currentUser: currentUserReducer,
    editor: editorReducer,
    sentiment: sentimentReducer
  });
  
  export default rootReducer;