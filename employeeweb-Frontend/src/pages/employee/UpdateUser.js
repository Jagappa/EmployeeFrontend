import "./UpdateUser.css";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {

const {id} = useParams(); // Assuming you are using react-router-dom to get the employee ID from the URL

const navigate = useNavigate();


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
        };
        useEffect(() => {
            const fetchEmployee = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error("❌ Error fetching employee data:", error.message);
                }
            };
            fetchEmployee();
        }, [id]);


    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            // Here you can add the logic to send formData to your backend or API
            console.log("Employee data updated successfully", data);
            navigate("/"); 
            // Redirect or show success message as needed
        } catch (error) {
            console.error("Error updating employee data:", error);
        }
    }

    return (
        <>
        <div className="center-form">
                <h1>Edit Employee </h1>
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
                               Edit Employee
                               </Button>                                
                </Form>
        </div>
           </>
    );
}
export default UpdateUser;