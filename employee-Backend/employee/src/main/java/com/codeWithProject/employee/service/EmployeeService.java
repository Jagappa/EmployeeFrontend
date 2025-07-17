package com.codeWithProject.employee.service;

import com.codeWithProject.employee.Entity.Employee;
import com.codeWithProject.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public Employee postEmployee(Employee employee)
    {
        return employeeRepository.save(employee);
    }
    public List<Employee> getAllEmployee()
    {
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id)
    {
        if(!employeeRepository.existsById(id))
        {
            throw new EntityNotFoundException("Employee Eith ID" +id+ "not found");
        }
        employeeRepository.deleteById(id);
    }
    public Employee getEmployeeById(Long id)
    {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee updateEmployee(Long id, Employee employee)
    {
        Optional<Employee> optionalEmployee=employeeRepository.findById(id);
        if(optionalEmployee.isPresent())
        {
            Employee existingEmployee =optionalEmployee.get();
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());
            return employeeRepository.save(existingEmployee);


        }
        return null;
    }
}
