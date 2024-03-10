import React,{useState,useEffect} from 'react';
import './Account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom';
import logo from './images/Adicshan_Logo.png';
import add from './images/add.png';
import benchPress from './images/benchPress.png';
import cycling from './images/cycling.png';
import dumbbell from './images/dumbbell.png';
import legPress from './images/legPress.png';
import plank from './images/plank.png';
import pullUp from './images/pullup.png';
import pushUp from './images/pushUp.png';
import running from './images/running.png';
import situps from './images/situps.png';
import squats from './images/squats.png';
import timer_gif from './images/timer_gif.gif';
import fire from './images/fire.png';
 

function Account({ email, onLogout }){
    const navigate=useNavigate();

    const items=[running,pushUp,benchPress,cycling,dumbbell,legPress,plank,
      pullUp,situps,squats];
    
      const itemsName=["Running","PushUp","BenchPress","Cycling","Dumbbell","LegPress",
    "Plank","PullUp","Situps","Squats"];
    
     const met=[10.6,8.6,5.9,8.6,6.5,5.4,4.3,8.5,8.6,6.5];
    
    const [metValue,setMetValue]=useState(''); 
    const [seconds,setSeconds]=useState(0);
    const [minutes,setMinutes]=useState(0);
    const [isRunning,setIsRunning]=useState(false);
    const [selExer,setSelExer]=useState('');
    const [selExerImg,setSelExerImg]=useState('');
    const [dataArray,setDataArray]=useState([]);
    const [calorie,setCalorie]=useState('');
    const [totalCal,setTotalCal]=useState('0');
  

    useEffect(()=>{
        let timer=null;
        if(isRunning){
            timer=setInterval(()=>{
                 setSeconds((prevSeconds)=>{
                  if(prevSeconds===59){
                    setMinutes((prevMinutes)=>prevMinutes+1);
                    return 0;
                  }
                  else{
                   
                    return prevSeconds+1;
                  }
                 })
                
           },1000);
         
          }
          setCalorie((prevCalorie)=> Math.floor((minutes + (seconds / 60)) * metValue));
           return ()=> clearInterval(timer);
      },[isRunning,minutes,seconds,metValue]);
  
    


    const handleTimerStart=()=>{
        setIsRunning(true);
        const Stop = document.getElementById('stop');
        Stop.style.display="block";
        const Start = document.getElementById('start');
        Start.style.display="none";
      const timerGif=document.getElementById('timerGif');
      timerGif.style.display='block';
     
  
  
  
      };
  
      const handleTimerStop=()=>{
      setIsRunning(false);
     
      const Stop = document.getElementById('stop');
      Stop.style.display="none";
      const Start = document.getElementById('start');
      Start.style.display="block";
      const timerGif=document.getElementById('timerGif');
      timerGif.style.display='none';
      };
    


    const handleExerData=()=>{
        setMinutes(0);
        setSeconds(0);
        setIsRunning(false);
        const exerCont= document.getElementById('exerCont');
        const exerData= document.getElementById('exerData');
        exerData.style.display="block";
        exerCont.style.display="none";
      };
    
    const handleTimes=()=>{
      const exerData= document.getElementById('exerData');
      exerData.style.display="none";
      const Stop = document.getElementById('stop');
      Stop.style.display="none";
      const Start = document.getElementById('start');
      Start.style.display="block";
      setMinutes(0);
      setSeconds(0);
      setCalorie(0);
    };
    

    const handleExerCont=()=>{
        const exerCont= document.getElementById('exerCont');
        exerCont.style.display="block";
     };

     const handleExerContNone=()=>{
        const exerCont= document.getElementById('exerCont');
        exerCont.style.display="none";
      };


      
const handleAddData=async(e)=>{
e.preventDefault();
try{
 const addDataResponse= await fetch('http://localhost:3001/data',{
 method:"POST",
 headers: {
  'Content-Type': 'application/json'
 },
 body: JSON.stringify({ seconds,minutes , selExer, calorie})
 });

 const data = await addDataResponse.json();
 
}catch(error){
console.log('error fetching data:',error);

}


    if(seconds!==0){
    handleTimerStop();
    handleTimes();
        const data={
          exerName:selExer,
          exerTimeMin:minutes,
          exerTimeSec:seconds,
          exerImg: selExerImg,
          exerCal: calorie
        };
        setDataArray([...dataArray,data]);
      const tC=parseInt(totalCal) + parseInt(calorie);
      setTotalCal(tC);
  setCalorie(0);
  
  
      }


  
  };

    return(
<div classname="account">
  <h1>{email}</h1>
  <button onClick={onLogout} >Logout</button>
        <div className='vertical' style={{width:"60px",height:"100vh",backgroundColor:"black"}}>
        <img className='logo' src={logo} alt='error'/>
        <p className='title'>Adicshan</p>
        </div>

<div className='dataCont'>

<div id='calorieLine' style={{height:`${ dataArray.length *  85}px`}}></div>
                   <div className='endDot' style={{top:`${ dataArray.length *  85}px`}}>{totalCal}</div>

                   <button className='startButton'>Ready</button>
                   {dataArray.map((item,index)=>(
      <div key={index}  className="exerDataCont">
        <img className="selExerImg" src={item.exerImg} alt="error" />
        <span  className="selExerName">{item.exerName}</span>
        <img src={fire} className="selExerFire" alt="error"/>
        <span  className="selExerCal">{item.exerCal}</span>
        <span className="selExerTime">{item.exerTimeMin}min{item.exerTimeSec}sec</span>
      </div>
))}
</div>
<div className="footer">
            <img className="addButton" src={add} onClick={handleExerCont} alt="error" />

          </div>


<div id="exerCont">
        
        <div className="container">
        <div className="leftArrowExer" onClick={handleExerContNone}>
       <FontAwesomeIcon  icon={faArrowLeft} />
     </div>
         {items.map((item,index)=>(
  <div key={index} onClick={() => {handleExerData(); setSelExer(itemsName[index]);setMetValue(met[index]); setSelExerImg(item)}} className="item">
  <img src={item} alt="error" className="exerImg"/>
 </div>
         ))}
        </div>
          </div>



          <div id="exerData" style={{position:"absolute",top:"0px"}}>
        
        <div id='selExer'>
        
        <img src={selExerImg} alt="error" className="selExerimg"/>
        <p style={{color:"white",position:"absolute",top:"75%",fontSize:"20px",marginLeft:"10px"}}>{selExer}</p>
       </div>
             <div className="leftArrowExer" style={{color:"black"}} onClick={handleTimes}>
          <FontAwesomeIcon  icon={faTimes} />
        </div>
        <img id="timerGif" src={timer_gif} alt="error"/>
        <div className="timer">
         
          {minutes}:{seconds}</div>
    <button id="start" onClick={handleTimerStart}>Ready</button>
    <button id="stop" onClick={handleTimerStop}>Stop</button>
    
    <div className="calorieBurn">Calorie
    <img src={fire} className="fire"  alt="error"/>: {calorie}
    </div>
    <button id="add" onClick={handleAddData}>add</button>
    </div>
             



       
</div>


    );
}
export default Account;