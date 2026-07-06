package com.placement.controller;

import com.placement.model.Company;
import com.placement.model.Student;
import com.placement.repository.CompanyRepository;
import com.placement.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        return companyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Company> createCompany(@Valid @RequestBody Company company) {
        Company saved = companyRepository.save(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(@PathVariable Long id, @Valid @RequestBody Company updated) {
        return companyRepository.findById(id).map(company -> {
            company.setName(updated.getName());
            company.setJobRole(updated.getJobRole());
            company.setPackageLpa(updated.getPackageLpa());
            company.setMinCgpa(updated.getMinCgpa());
            company.setMaxBacklogs(updated.getMaxBacklogs());
            company.setEligibleBranches(updated.getEligibleBranches());
            company.setDriveDate(updated.getDriveDate());
            return ResponseEntity.ok(companyRepository.save(company));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
        if (!companyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        companyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Core placement eligibility logic:
    // A student is eligible for a company's drive if:
    //   - student's CGPA >= company's minimum required CGPA
    //   - student's backlogs <= company's maximum allowed backlogs
    //   - student's branch is in the company's list of eligible branches
    @GetMapping("/{id}/eligible-students")
    public ResponseEntity<?> getEligibleStudents(@PathVariable Long id) {
        return companyRepository.findById(id).map(company -> {
            List<String> eligibleBranches = company.getEligibleBranchesList();

            List<Student> eligible = studentRepository.findAll().stream()
                    .filter(s -> s.getCgpa() != null && s.getCgpa() >= company.getMinCgpa())
                    .filter(s -> s.getBacklogs() != null && s.getBacklogs() <= company.getMaxBacklogs())
                    .filter(s -> s.getBranch() != null && eligibleBranches.contains(s.getBranch().trim().toUpperCase()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(eligible);
        }).orElse(ResponseEntity.notFound().build());
    }
}
