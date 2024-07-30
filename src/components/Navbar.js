import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './Navbar.css';
import MyntraLogo from '../assets/myntra-logo.png';
import { Link, useNavigate } from 'react-router-dom';

export default function CustomNavbar() {
    const [hoveredDropdown, setHoveredDropdown] = useState(null);
    const navigate = useNavigate(); 

    const handleDropdownEnter = (eventKey) => {
        setHoveredDropdown(eventKey);
    };

    const handleDropdownLeave = () => {
        setHoveredDropdown(null);
    };

    const handleLogout = () => {
       
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg" className="custom-navbar">
            <Navbar.Brand href="home">
                <img
                    src={MyntraLogo}
                    height="30"
                    className="d-inline-block align-top"
                    alt="Myntra logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto custom-nav">
                    <NavDropdown
                        title="MEN"
                        id="men-dropdown"
                        className="custom-dropdown"
                        onMouseEnter={() => handleDropdownEnter('men-dropdown')}
                        onMouseLeave={handleDropdownLeave}
                        show={hoveredDropdown === 'men-dropdown'}
                    >
                        <NavDropdown.Item href="#">TopWear</NavDropdown.Item>
                        <NavDropdown.Item href="#">Indian and Festive wear</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">BottomWear</NavDropdown.Item>

                        <NavDropdown.Item href="#">Innerwear and Sleepwear</NavDropdown.Item>
                        <NavDropdown.Item href="#">Footwear</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        title="WOMEN"
                        id="women-dropdown"
                        className="custom-dropdown"
                        onMouseEnter={() => handleDropdownEnter('women-dropdown')}
                        onMouseLeave={handleDropdownLeave}
                        show={hoveredDropdown === 'women-dropdown'}
                    >
                        <NavDropdown.Item href="#">Indian and Fusion Wear</NavDropdown.Item>
                        <NavDropdown.Item href="#">Western Wear</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Maternity</NavDropdown.Item>

                        <NavDropdown.Item href="#">Footwear</NavDropdown.Item>
                        <NavDropdown.Item href="#">Sports & Active wear</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        title="KIDS"
                        id="kids-dropdown"
                        className="custom-dropdown"
                        onMouseEnter={() => handleDropdownEnter('kids-dropdown')}
                        onMouseLeave={handleDropdownLeave}
                        show={hoveredDropdown === 'kids-dropdown'}
                    >
                        <NavDropdown.Item href="#">Boys Clothing</NavDropdown.Item>
                        <NavDropdown.Item href="#">Girls Clothing</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Footwear</NavDropdown.Item>
                        <NavDropdown.Item href="#">Toys</NavDropdown.Item>

                    </NavDropdown>
                    <NavDropdown
                        title="HOME & LIVING"
                        id="home-dropdown"
                        className="custom-dropdown"
                        onMouseEnter={() => handleDropdownEnter('home-dropdown')}
                        onMouseLeave={handleDropdownLeave}
                        show={hoveredDropdown === 'home-dropdown'}
                    >
                        <NavDropdown.Item href="#">Bed Linen & Furnishing</NavDropdown.Item>
                        <NavDropdown.Item href="#">Flooring</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Bath</NavDropdown.Item>
                        <NavDropdown.Item href="#">Lamps & Lighting</NavDropdown.Item>
                        <NavDropdown.Item href="#">Home Decor</NavDropdown.Item>

                    </NavDropdown>
                    <NavDropdown
                        title="BEAUTY"
                        id="beauty-dropdown"
                        className="custom-dropdown"
                        onMouseEnter={() => handleDropdownEnter('beauty-dropdown')}
                        onMouseLeave={handleDropdownLeave}
                        show={hoveredDropdown === 'beauty-dropdown'}
                    >
                        <NavDropdown.Item href="#">Makeup</NavDropdown.Item>
                        <NavDropdown.Item href="#">SkinCare,Bath & Body</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">HairCare</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        title="DESIGN"
                        id="studio-dropdown"
                        className="custom-dropdown"
                        onMouseEnter={() => handleDropdownEnter('studio-dropdown')}
                        onMouseLeave={handleDropdownLeave}
                        show={hoveredDropdown === 'studio-dropdown'}
                        onClick={() => navigate('/user-dashboard')}
                    >
                        <NavDropdown.Item href="#">Submit Design</NavDropdown.Item>

                    </NavDropdown>
                    <NavDropdown
                        title="POLL"
                        id="poll-dropdown"
                        className="custom-dropdown"
                        onMouseEnter={() => handleDropdownEnter('poll-dropdown')}
                        onMouseLeave={handleDropdownLeave}
                        show={hoveredDropdown === 'poll-dropdown'}
                        onClick={() => navigate('/user-dashboard-poll')}
                    >
                        <NavDropdown.Item href="#">Vote for designs</NavDropdown.Item>

                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <Nav className="ml-auto">
                    <NavDropdown title="Profile" id="profile-dropdown" className="custom-dropdown">
                    <NavDropdown.Item onClick={() => navigate('/tanyaProfile')}>View Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Wishlist" id="wishlist-dropdown" className="custom-dropdown">
                        <NavDropdown.Item href="#">My Wishlist</NavDropdown.Item>
                        <NavDropdown.Item href="#">View All</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Cart" id="cart-dropdown" className="custom-dropdown">

                    </NavDropdown>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    );
}
