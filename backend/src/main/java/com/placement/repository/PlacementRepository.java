package com.placement.repository;

import com.placement.model.Placement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlacementRepository extends JpaRepository<Placement, Long> {
    boolean existsByStudent_IdAndCompany_Id(Long studentId, Long companyId);
    List<Placement> findByCompany_Id(Long companyId);
    List<Placement> findByStudent_Id(Long studentId);
}
