import {combineReducers} from "@reduxjs/toolkit";
import gameboardReducer from './gameboardReducer';


const rootReducer = combineReducers({
    gameboard: gameboardReducer,
    

})

export default rootReducer;