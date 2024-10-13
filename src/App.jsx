import { useReducer } from 'react'

import './App.css'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'


export const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OP:'choose-operand',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate',
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOP:payload.digit,
          overwrite:false,
        }
      }
      if(payload.digit === "0" && state.currentOP === "0"){
        return state;}

      if(payload.digit === "." && state.currentOP.includes(".")){
        return state;}
      
      return{
        ...state,
        currentOP:`${state.currentOP || ""}${payload.digit}`
      };

    case ACTIONS.CLEAR:
      return{
        currentOP: null,
        previousOP: null,
        operation: null,
      };

    case ACTIONS.CHOOSE_OP:
      if(state.currentOP == null && state.previousOP==null){
        return state;
      }
      if(state.currentOP==null){
        return{
          ...state,
          operation:payload.operation,
        }
      }
      if(state.previousOP==null){
        return{
          ...state,
          operation:payload.operation,
          previousOP:state.currentOP,
          currentOP:null,
        }
      }
      return{
        ...state,
        previousOP:evaluate(state.currentOP, state.previousOP, state.operation),
        operation:payload.operation,
        currentOP:null,
      };

    case ACTIONS.EVALUATE:{
      if(
        state.operation ==null ||
        state.currentOP ==null ||
        state.previousOP==null  
        ){
          return state;
        }
      const result=evaluate(state.currentOP,state.previousOP,state.operation);
        return{
          ...state,
          overwrite:true,
          previousOP:null,
          operation :null,
          currentOP : result,
        };
      }
    case ACTIONS.DELETE_DIGIT:{
      if(state.overwrite) return {
        ...state,
        overwrite:false,
        currentOP:null,
      }
    }
      if(state.currentOP==null) return state;
      if(state.currentOP.length===1){
        return{ ...state,currentOP:null};
      }
      return{
        ...state,
        currentOP:state.currentOP.slice(0,-1),
      }
  }
}

function evaluate(currentOP,previousOP,operation){
  const prev = parseFloat(previousOP)
  const current = parseFloat(currentOP)
  if (isNaN(prev) || isNaN(current)) return"0";

  let computation="";
  switch(operation){
    case '+':
      computation= prev+current;
      break;
    case '*':
      computation= prev*current;
      break;
    case '-':
      computation= prev-current;
      break;
    case '÷':
      computation= current === 0 ? "Error" : prev / current;;
      break;
    default: return "0";
  }
  return computation.toString();
}

function App() {

  const[{currentOP,previousOP,operation},dispatch]=useReducer(reducer,{

  })

  return (
    <>
    <div className="flex  items-center justify-center min-h-screen ">
      <div className='calcBODY bg-black bg-opacity-50 flex flex-col rounded  m-5 min-w-[600px] max-w-[600px]  '>
        <div className='calcDisplay  flex flex-col bg-teal-950 bg-opacity-20 justify-end text-end p-1 min-h-20 overflow-hidden text-ellipsis whitespace-nowrap delay-200 '>
          <div className='calcPreviousOP text-white opacity-75 text-4xl '>{previousOP}{operation}</div>
          <div className='calcCurrentOP text-black text-6xl pt-3 '>{currentOP}</div>
        </div>
        <div className='calcBody bg-blue-700 bg-opacity-20 opacity-85  flex flex-row grow p-2'>
          
          <div className="bodyLeft flex flex-col flex-[7] p-3">

            <div className="calcBodyButtons bg-pink-300 flex flex-row  space-x-2 m-1 mb-0 p-3 pb-2 pl-2 rounded-sm">
              <button className="clearButton bg-blue-500 text-sm m-0 p-2 rounded w-20"
                onClick={()=>dispatch({type:ACTIONS.CLEAR})}>
                  AC</button>
              <button className="deleteButton bg-red-500 text-sm m-0 p-2 rounded w-20"
                onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>
                DEL</button>
            </div>

            <div className="calcNumbers bg-gray-300 text-black grid grid-cols-3 p-2 m-0 border-2 border-black ">
              <DigitButton  digit='1' dispatch={dispatch}/>
              <DigitButton  digit='2' dispatch={dispatch}/>
              <DigitButton  digit='3' dispatch={dispatch}/>
              <DigitButton  digit='4' dispatch={dispatch}/>
              <DigitButton  digit='5' dispatch={dispatch}/>
              <DigitButton  digit='6' dispatch={dispatch}/>
              <DigitButton  digit='7' dispatch={dispatch}/>
              <DigitButton  digit='8' dispatch={dispatch}/>
              <DigitButton  digit='9' dispatch={dispatch}/>
              <DigitButton  digit='0' dispatch={dispatch}/>
              <DigitButton  digit='.' dispatch={dispatch}/>
            </div>

          </div>

          <div className="bodyRight flex flex-col flex-[3] bg-slate-300 bg-opacity-60 rounded-md">

            <div className="calcOP grid grid-cols-2 gap-3 p-2 ">
              <OperationButton  operation='+' dispatch={dispatch}/>
              <OperationButton  operation='*' dispatch={dispatch}/>
              <OperationButton  operation='-' dispatch={dispatch}/>
              <OperationButton  operation='÷' dispatch={dispatch}/>

            </div>
            <div className="submitButton flex grow">
                <button className='text-4xl  p-2 pt-16 justify-center text-center  bg-pink-300 bg-opacity-80 rounded-lg flex grow hover:shadow-2xl hover:bg-slate-400 hover:opacity-80  delay-100 ' 
                  onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default App
