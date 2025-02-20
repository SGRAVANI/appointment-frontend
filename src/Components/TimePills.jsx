// import React, { useEffect, useState } from 'react'
// import { motion } from "framer-motion";
// function TimePills(start,end,booked,selectedDate) {
//    let [slots,setSlots]=useState([])
//     function getSlots()
//     {
//         console.log(start,end,typeof start)
//         let notVailable=booked?.selectedDate;
//        if(!notVailable)
//        {
//        notVailable=[]
//        }
//        let s=[]
//         for(let i=start;i<end;i++)
//         {
            
//         if(!notVailable.includes(i))
//         {
//         s.add(i)
//         }
//         }

//         console.log(s)
//         setSlots(s)
//     }
//     useEffect(()=>{
//      getSlots()
//     },[])
//   return (slots.length>0 && <div className="flex flex-wrap gap-2 justify-center">
//                   {slots.map((slot, index) => (
//                     <motion.button 
//                       key={index} 
//                       className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
//                       whileHover={{ scale: 1.1 }}
//                       onClick={() => { setSelectedSlot(slot.time); setShowForm(true); }}
//                     >
//                       {slot.time}
//                     </motion.button>
//                   ))}
//                 </div>

//   )
// }

// export default TimePills
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TimePills = ({ start, end, booked = [], selectedDate, setSelectedSlot, setShowForm }) => {
  const [slots, setSlots] = useState([]);

  /** Generate Available Time Slots */
  useEffect(() => {
    if (!start || !end) return;

    const notAvailable = booked[selectedDate] || []; // Ensure booked slots exist
    let availableSlots = [];

    for (let i = start; i < end; i++) {
      if (!notAvailable.includes(i)) {
        availableSlots.push(i);
      }
    }

    setSlots(availableSlots);
  }, [start, end, booked, selectedDate]); // Dependencies ensure it updates correctly

  return (
    slots.length > 0 && (
      <div className="flex flex-wrap gap-2 justify-center">
        {slots.map((slot, index) => (
          <motion.button
            key={index}
            className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setSelectedSlot(slot);
              setShowForm(true);
            }}
          >
            {slot}:00
          </motion.button>
        ))}
      </div>
    )
  );
};

export default TimePills;
