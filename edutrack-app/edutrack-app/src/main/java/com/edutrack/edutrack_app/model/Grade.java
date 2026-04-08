package com.edutrack.edutrack_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "grades")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // The Student ID
    private Long classId;
    private Integer quiz;
    private Integer midterm;
    private Integer assignment;
    
    @Column(insertable = false, updatable = false)
    private Double total; // This is calculated by MySQL automatically

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }
    public Integer getQuiz() { return quiz; }
    public void setQuiz(Integer quiz) { this.quiz = quiz; }
    public Integer getMidterm() { return midterm; }
    public void setMidterm(Integer midterm) { this.midterm = midterm; }
    public Integer getAssignment() { return assignment; }
    public void setAssignment(Integer assignment) { this.assignment = assignment; }
    public Double getTotal() { return total; }
}