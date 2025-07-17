import Form from "react-bootstrap/Form";
import "./PostUser.css";
import { useState } from "react";
import  Button  from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


const PostUser = () => {


    const [ formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data =await response.json();
            // Here you can add the logic to send formData to your backend or API
            console.log("Employee data submitted successfully", data);
            navigate("/"); // Redirect to the dashboard or another page after successful 
        }
        
        // Here you can add the logic to send formData to your backend or API
        catch (error) {
            console.error("Error submitting employee data:", error);
        }
    }
    
    return (
        <>
        <div className="center-form">
                <h1>Post New Employee </h1>
                <Form onSubmit={handlesubmit}>
                    
                        <Form.Group controlId="formBasicName">
                            <Form.Control 
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                           <Form.Control 
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Control 
                                type="text"
                                name="phone"
                                placeholder="Enter phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                           </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Control 
                                type="text"
                                name="department"
                                placeholder="Enter department"
                                value={formData.department}
                                onChange={handleInputChange}
                            />      
                            </Form.Group>                
                            <Button variant="primary" type="submit" className="w-100">
                               post Employee
                               </Button>                                
                </Form>
        </div>
           </>
            
            )
}
export default PostUser;