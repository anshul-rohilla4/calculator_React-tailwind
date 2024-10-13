import { ACTIONS } from "./App";

function DigitButton({dispatch, digit}){
    return (<button
    className="p-4 border hover:shadow-xl"
    onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>
        {digit}
        </button>
)}

export default DigitButton;