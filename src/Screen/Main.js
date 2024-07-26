import React, { useState, useEffect } from 'react';
import Header from '../Components/Header'
import  Typewriter  from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import { Supabase } from "../config/supabase-config";


const Main = () => {

    const calculateTimeLeft = () => {
        const difference = +new Date("2024-09-1") - +new Date();
        
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    
        return () => clearTimeout(timer);
      });
    
      const { days, hours, minutes, seconds } = timeLeft;






      const initialValues = {
        email: "",
        
      };



  const [formData, setFormData] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // const {fullname, value} = e.target;
    setFormData({ ...formData, email: e.target.value });
    console.log(formData);
  };

  // code section starts here

  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formErrors]);


const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

if (!values.email) {
    errors.email = "Email is required";
  }else{
        Supabase.from("agrovest1")
          .upsert([
            {
              email: formData.email,
            },
          ])
          .then((response) => {
            alert('Successful')
            console.log(response);
            window.location.reload();
            
          });
            }
            
      return errors;
    };

 

  return (
    <div className='main'>
      <div className="dk"></div>
        <Header/>
        

        <div className='main-c'>
            <h1 className='poppins-bold'>
              <Typewriter
                      options={{
                        autoStart: true,
                        loop: true,
                        delay: 70,
                        strings:[
                          "COMING SOON",
                          "EMPOWERING FARMERS",
                          "FOSTERING INTEREST IN AGRICULTURE",
                          "PROMOTING SUSTAINABLE PRACTICE",
                          "CONNECTING FARMERS TO BUYERS"
                          
                        ],
                    }}
                    />
            </h1>
            
            <h3 className='poppins-medium'>Cultivating Innovation, Empowering Farmers, and Sustaining Our Future</h3>
            <p>We encourage the adoption of sustainable agricultural techniques to minimize environmental impact and ensure long-term viability.</p>

            <section className='countdown'>
            {days > 0 && (
                <div>
                    <h2 className='poppins-bold'>{days}</h2>
                    <h5>DAYS</h5>
                </div>

            )}

                <div>
                    <h2 className='poppins-bold'>{hours.toString().padStart(2, '0')}</h2>
                    <h5>HOURS</h5>
                </div>

                <div>
                    <h2 className='poppins-bold'>{minutes.toString().padStart(2, '0')}</h2>
                    <h5>MINUTES</h5>
                </div>

                <div>
                    <h2 className='poppins-bold'>{seconds.toString().padStart(2, '0')}</h2>
                    <h5>SECONDS</h5>
                </div>
            </section>

            <h6>BE THE FIRST TO KNOW WHEN WE LAUNCH</h6>

            <div className='form'>
              <p style={{ color: "red", fontSize: "18px" }}>{formErrors.email}</p>
                <input type="text" name="" id="" placeholder='Email Address/Phone Number'
                value={formData.email}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                }} />
                
                
                
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Main