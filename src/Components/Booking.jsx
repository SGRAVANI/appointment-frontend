// export default Booking;
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { endPoint } from "../../config";
import TimePills from "./TimePills";
const sampleDoctors = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, name: `Dr. Doctor ${i + 1}` }));

const sampleSlots = [
  { time: "09:00 AM" },
  { time: "10:00 AM" },
  { time: "11:00 AM" },
  { time: "02:00 PM" },
  { time: "03:00 PM" },
];

const Booking = () => {
const [doctorList,setDoctorList]=useState([])
 const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedBooked]=useState(null)
async function getDoctorList()
{
try{
let res=await fetch(`${endPoint}/doctor`)
let data=await res.json()
console.log(data.data)
setDoctorList(data.data)
for(let ele of data.data)
{
    console.log(ele,ele.booked,typeof ele.booked)
}
}
catch(e)
{

}
}

useEffect(()=>{
getDoctorList()
},[])

  const fetchSlots = () => {
    setSlots(sampleSlots);
  };

  const handleBookAppointment = () => {
    alert(`Appointment booked successfully!\nDoctor: ${selectedDoctor}\nDate: ${format(selectedDate, 'yyyy-MM-dd')}\nTime: ${selectedSlot}\nPatient: ${patientName}\nType: ${appointmentType}\nNotes: ${notes}`);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center space-y-4">
      <motion.h1 
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Doctor Appointment Booking
      </motion.h1>
      
      {/* Doctors List */}
      <motion.div className="bg-white p-4 rounded-lg shadow-lg w-full overflow-x-auto "
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <h2 className="text-lg font-semibold mb-2">Select a Doctor:</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {doctorList.map((doctor) => (
            <button 
              key={doctor.name} 
              className={`p-2 rounded-lg text-sm transition-colors duration-200 ${selectedDoctor?.name === doctor.name ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-900 hover:bg-blue-400'}`} 
              onClick={() => setSelectedDoctor(doctor)}
            >
              {doctor.name}
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Date Selection & Time Slots */}
      <motion.div className="bg-white p-4 rounded-lg shadow-lg w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <h2 className="text-lg font-semibold mb-2">Select a Date:</h2>
        <DatePicker 
          selected={selectedDate} 
          onChange={(date) => { setSelectedDate(date); fetchSlots(); }} 
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate() + 7)}
          className="w-full p-2 border rounded-lg text-center" 
        />
        
        {selectedDate && (
          <motion.div className="w-full mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-lg font-semibold mb-2">Available Slots:</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {slots.map((slot, index) => (
                <motion.button 
                  key={index} 
                  className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => { setSelectedSlot(slot.time); setShowForm(true); }}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>
            {/* <TimePills /> */}
          </motion.div>
        )}
      </motion.div>
      
      {/* Appointment Booking Form */}
      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-[50%]">
          <h2 className="text-lg font-semibold mb-2">Book Appointment</h2>
          <input type="text" placeholder="Patient Name" className="w-full p-2 border rounded-lg mb-2" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
          <input type="text" placeholder="Appointment Type" className="w-full p-2 border rounded-lg mb-2" value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)} />
          <textarea placeholder="Notes (Optional)" className="w-full p-2 border rounded-lg mb-2" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
          <motion.button 
            className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition w-full"
            whileHover={{ scale: 1.1 }}
            onClick={handleBookAppointment}
          >
            Confirm Appointment
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Booking;
