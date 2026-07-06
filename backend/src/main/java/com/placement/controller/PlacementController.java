package com.placement.controller;

import com.placement.model.Company;
import com.placement.model.Placement;
import com.placement.model.Student;
import com.placement.repository.CompanyRepository;
import com.placement.repository.PlacementRepository;
import com.placement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {

    @Autowired
    private PlacementRepository placementRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping
    public List<Placement> getAllPlacements() {
        return placementRepository.findAll();
    }

    @GetMapping("/company/{companyId}")
    public List<Placement> getByCompany(@PathVariable Long companyId) {
        return placementRepository.findByCompany_Id(companyId);
    }

    @GetMapping("/student/{studentId}")
    public List<Placement> getByStudent(@PathVariable Long studentId) {
        return placementRepository.findByStudent_Id(studentId);
    }

    // Register a student's application to a company drive
    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestBody Map<String, Long> body) {
        Long studentId = body.get("studentId");
        Long companyId = body.get("companyId");

        if (studentId == null || companyId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "studentId and companyId are required"));
        }

        if (placementRepository.existsByStudent_IdAndCompany_Id(studentId, companyId)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Student has already applied to this company"));
        }

        Student student = studentRepository.findById(studentId).orElse(null);
        Company company = companyRepository.findById(companyId).orElse(null);

        if (student == null || company == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid student or company id"));
        }

        Placement placement = new Placement();
        placement.setStudent(student);
        placement.setCompany(company);
        placement.setStatus("APPLIED");

        Placement saved = placementRepository.save(placement);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Update the status of an application: APPLIED, SELECTED, REJECTED
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || !(status.equals("APPLIED") || status.equals("SELECTED") || status.equals("REJECTED"))) {
            return ResponseEntity.badRequest().body(Map.of("error", "status must be APPLIED, SELECTED or REJECTED"));
        }

        return placementRepository.findById(id).map(placement -> {
            placement.setStatus(status);
            return ResponseEntity.ok(placementRepository.save(placement));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlacement(@PathVariable Long id) {
        if (!placementRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        placementRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
