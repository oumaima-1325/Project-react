import React from 'react'
import '../styles/About.css';
import chek from '../assets/chek.jpg'
import rahma from '../assets/rahma.png'
import ibtissam from '../assets/ibtissam.png'
import samira from '../assets/samira.png'
import oumaima from '../assets/oumaima.png'
import { useNavigate } from 'react-router-dom';




const About = () => {
    const navigate = useNavigate();

    const teamEmails = [
        'rahma.elatrach20@ump.ac.ma',
        'ibtisam.boujtat20@ump.ac.ma',
        'samira.bouhadi@ump.ac.ma',
        'oumaima.achour20@ump.ac.ma',
    ];
    const handleContact = (index) => {
        const email = teamEmails[index];
        window.location.href = `mailto:${email}`;
    };
    return (
        <>
            <section className="about_us">
                <h1>About Us</h1>
                <p style={{ fontWeight: 'bold' }}>GreatMeals is a restorant...</p>
                <div className="about-info">
                    <div className="about-img">
                        <img src={chek} alt="GreatMeals" />
                    </div>
                    <div>
                        <p>GreatMeals is a restaurant dedicated to providing an exceptional dining experience for our customers.
                            Our culinary team is passionate about crafting delicious and innovative dishes using high-quality ingredients.
                            Explore our diverse menu, featuring a variety
                            of culinary delights, and savor the flavors that make GreatMeals a unique destination for food enthusiasts.
                            At GreatMeals, we are not just serving meals; we are creating moments of culinary joy and bringing people together
                            through the love of good food.</p>

                        <button className="button_about" onClick={() => navigate('/Order')}>Read More...</button>
                    </div>
                </div>
            </section>

            <section className="team">
                <h1>Meet Our Team</h1>
                <div className="team-cards">
                    <div className="card_about">
                        <div className="card-img_about">
                            <img src={rahma} alt="User 1" />
                        </div>
                        <div class="card-info">
                            <h2 class="card-name">Rahma</h2>
                            <p class="card-role">CEO and Founder</p>
                            <p class="card-email">rahma.elatrach20@ump.ac.ma</p>
                            <p><button className="button_about" onClick={() => handleContact(0)}>
                                Contact
                            </button></p>
                        </div>
                    </div>
                    <div class="card_about">
                        <div class="card-img_about">
                            <img src={ibtissam} alt="User 1" />                </div>
                        <div className="card-info">
                            <h2 className="card-name">Ibtisam</h2>
                            <p className="card-role">Co-Founder</p>
                            <p className="card-email">ibtisam.boujtat@ump.ac.ma</p>
                            <p><button className="button_about" onClick={() => handleContact(1)}>Contact</button></p>
                        </div>
                    </div>
                    <div class="card_about">
                        <div class="card-img_about">
                            <img src={samira} alt="User 1" />                </div>
                        <div class="card-info">
                            <h2 class="card-name">Samira</h2>
                            <p class="card-role">Co-Founder</p>
                            <p class="card-email">samira.bouhadi@ump.ac.ma</p>
                            <p><button className="button_about" onClick={() => handleContact(2)}> Contact</button></p>
                        </div>
                    </div>
                    <div class="card_about">
                        <div class="card-img_about">
                            <img src={oumaima} alt="User 3" />
                        </div>
                        <div class="card-info">
                            <h2 class="card-name">Oumaima</h2>
                            <p class="card-role">Co-Founder</p>
                            <p class="card-email">oumaima.achour20@ump.ac.ma</p>
                            <p><button className="button_about" onClick={() => handleContact(3)}>Contact</button></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;