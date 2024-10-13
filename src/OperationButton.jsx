import { ACTIONS } from "./App";

function OperationButton({ dispatch, operation}){
    return (<button 
    className="text-4xl  p-2 justify-center text-center  bg-pink-300 bg-opacity-80 rounded-lg flex grow hover:shadow-2xl hover:bg-slate-400 hover:opacity-80  delay-100  "
    onClick={()=>dispatch({type:ACTIONS.CHOOSE_OP,payload:{operation}})}>
        {operation}
        </button>
)}

export default OperationButton;