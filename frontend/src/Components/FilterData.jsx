import React, { useEffect, useState } from 'react';
import '../CSS/FilterData.css';
import UserService from '../Service/userService';

const FilterData = (props) => {
  const [data, setData] = useState();
  const [time, setTime] = useState([]);
  let timeStampDataObject;
  let timeStampDataArray;

  
  

  // getting all the data from backend using async and await
  const getData = async () => {
    timeStampDataObject = await UserService.getData();
    timeStampDataArray = timeStampDataObject.data;
    setData(timeStampDataArray);

    const timeArray = timeStampDataArray.map(val => {
      const date = new Date(val.ts);
      return {
        timestamp: date.getTime(), 
        hour: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds()
      };
    });

    setTime(timeArray);
  }

  useEffect(() => {

    getData();
  }, []);


  const [click, setClick] = useState();
  //attaching the event handler on button 
  const buttonHandler=(e)=>{
    setClick(e.target.value)
  }
  return (
    <>
  {/* buttons to filter data by half hour and one hour */}
  <div className="button-container" style={{ display: "flex", justifyContent: "flex-end" }}>
    <h5 style={{marginRight:"-7%"}}>Filter data</h5>
  <ul className="button-list" style={{ listStyleType: "none", margin: 0, padding: 0, display: "flex", alignItems: "right",marginTop:"2%" }} onClick={buttonHandler}>
    <li style={{ marginRight: '15px' }}>
      <button value='1/2 Hr' className="btn btn-primary" >1/2 Hr</button>
    </li>
    <li style={{ marginRight: '25px' }}>
      <button value='1 Hr' className="btn btn-secondary">1 Hr</button>
    </li>
  </ul>
</div>
      <div>
        <div className="container" style={{ position: 'relative', top: "100px", marginLeft: "16%" }}>
          <div style={{ fontSize: "20px", marginBottom: "1%" }}>Cycle Status</div>
          {data &&
            data.map((entry, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: '.2px',
                  height: '150%',
                  left: `${index * .2}px`,
                  backgroundColor: entry.machine_status === 0 ? 'yellow' : 'green',
                }}
              >
                {/* Display the timestamp on button click */}
                {((click === "1/2 Hr" && index % 1500 === 0) || (click === "1 Hr" && index % 3000 === 0) || index === data.length - 1 || index===0) && (
                  <div style={{ position: 'absolute', top: '100%', transform: 'translateX(-50%)' }}>
                   {new Date(time[index].timestamp).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'UTC'
                  })}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FilterData;
