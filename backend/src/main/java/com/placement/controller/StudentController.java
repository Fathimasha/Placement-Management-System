package com.placement.controller;

import com.placement.model.Student;
import com.placement.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "https://placement-management-system-rouge.vercel.app")
public class StudentController  {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@Valid @RequestBody Student student) {
        if (studentRepository.existsByRollNo(student.getRollNo())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Roll number already exists"));
        }
        Student saved = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @Valid @RequestBody Student updated) {
        return studentRepository.findById(id).map(student -> {
            student.setName(updated.getName());
            student.setRollNo(updated.getRollNo());
            student.setBranch(updated.getBranch());
            student.setCgpa(updated.getCgpa());
            student.setBacklogs(updated.getBacklogs());
            student.setEmail(updated.getEmail());
            student.setPhone(updated.getPhone());
            return ResponseEntity.ok(studentRepository.save(student));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        if (!studentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        studentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
