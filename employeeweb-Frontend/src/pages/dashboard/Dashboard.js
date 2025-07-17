import { useEffect, useState} from "react";
// import { Col, Row } from "react-bootstrap";
// import './Dashboard.css'; 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

// import Dashboard from './pages/dashboard/Dashboard';
const Dashboard = () => {

    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect( ()=>{
        const fetchEmployee = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/employees");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error("❌ Error fetching employee data:", error.message);
            }
        } 
        fetchEmployee();

        
    },[]); 

const handleDelete = async (employeeId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);  
        }
        setEmployee(employee.filter(emp => emp.id !== employeeId));
    } catch (error) {
        console.error("❌ Error deleting employee:", error.message);
    }
}
const handleUpdate = (employeeId) => {
  navigate(`/employee/${employeeId}`);
};

    return (
        <>
     <Container className="mt-5">
      <Row>
      <Col>

        <h1 className="text center"> Employee</h1>
        <Table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>
                    {/* <Button variant="outline-secondary">Update</Button> */}
                    <Button variant="outline-primary" onClick={() => handleUpdate(employee.id)}>UPDATE</Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>DELETE</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Col>
      </Row>


     </Container>
        
        </>
    );
}
export default Dashboard;