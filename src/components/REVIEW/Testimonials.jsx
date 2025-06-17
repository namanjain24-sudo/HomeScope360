import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-heading">
          <h2>
            <span className="heading-blue">Join our community </span>
            and move <br></br>hassle-free.
          </h2>
        </div>

        <div className="testimonials-cards">
          <div className="testimonial-card">
            <div className="profile-image">
              <img 
                src="https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Charlisa Boyd and family" 
              />
            </div>
            <p className="testimonial-text">
            For HomeScope360, it wasn’t just about selling me a house—it was about helping me find a place to call home. They treated me like I was their only client, with genuine one-on-one attention throughout.
            </p>
          
            <div className="customer-info">
              <h3>Charlisa Boyd</h3>
              <p>Sold through HomeScope360 in Raleigh, NC</p>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="profile-image">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Adam Leon" 
              />
            </div>
            <p className="testimonial-text">
            HomeScope360's offer was right in line with our expectations—and we didn’t even have to list the house or deal with showings. For the ease and value they provide, it was a no-brainer.
            </p>

            <div className="customer-info">
              <h3>Adam Leon</h3>
              <p>Sold through HomeScope360 in Phoenix, AZ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
