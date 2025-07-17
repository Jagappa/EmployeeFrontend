package com.codeWithProject.employee.controller;

import com.codeWithProject.employee.Entity.Employee;
import com.codeWithProject.employee.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {
    private final EmployeeService employeeService;
    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody Employee employee)
    {
        return employeeService.postEmployee(employee);
    }
    @GetMapping("/employees")
    public List<Employee> getEmployees()
    {
        return employeeService.getAllEmployee();
    }@DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id)
    {
        try{
            employeeService.deleteEmployee(id); return new ResponseEntity<>( "Employee with Id" +id+ "deleted sussceffut", HttpStatus.OK);
  } catch (EntityNotFoundException e){

                 return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }
}
      @GetMapping("/employee/{id}")
      public ResponseEntity<?> getEmployeeById(@PathVariable Long id)
      {
          Employee employee =employeeService.getEmployeeById(id);
          if(employee==null) return ResponseEntity.notFound().build();
          return ResponseEntity.ok(employee);
      }@PatchMapping("/employee/{id}")
      public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee employee)
      {
          Employee updaEmployee=employeeService.updateEmployee(id,employee);
          if(updaEmployee== null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
          return ResponseEntity.ok(updaEmployee);
      }
}
