package com.placement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Company name is required")
    private String name;

    @Column(name = "job_role")
    private String jobRole;

    @Column(name = "package_lpa")
    private Double packageLpa;

    @Column(name = "min_cgpa")
    private Double minCgpa = 0.0;

    @Column(name = "max_backlogs")
    private Integer maxBacklogs = 0;

    @NotBlank(message = "Eligible branches are required")
    @Column(name = "eligible_branches")
    private String eligibleBranches; // comma separated e.g. "CSE,IT,ECE"

    @Column(name = "drive_date")
    private LocalDate driveDate;

    public Company() {}

    // Helper: parse branches into a list, trimmed and uppercased
    @Transient
    public List<String> getEligibleBranchesList() {
        if (eligibleBranches == null || eligibleBranches.isBlank()) return List.of();
        return Arrays.stream(eligibleBranches.split(","))
                .map(String::trim)
                .map(String::toUpperCase)
                .collect(Collectors.toList());
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }

    public Double getPackageLpa() { return packageLpa; }
    public void setPackageLpa(Double packageLpa) { this.packageLpa = packageLpa; }

    public Double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }

    public Integer getMaxBacklogs() { return maxBacklogs; }
    public void setMaxBacklogs(Integer maxBacklogs) { this.maxBacklogs = maxBacklogs; }

    public String getEligibleBranches() { return eligibleBranches; }
    public void setEligibleBranches(String eligibleBranches) { this.eligibleBranches = eligibleBranches; }

    public LocalDate getDriveDate() { return driveDate; }
    public void setDriveDate(LocalDate driveDate) { this.driveDate = driveDate; }
}
