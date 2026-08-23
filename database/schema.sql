-- ============================================
-- School Management System Database Schema
-- ============================================
CREATE DATABASE IF NOT EXISTS school_system;
USE school_system;


-- 1. Classes
CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2. Subjects
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 3. Users
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','teacher','admin','staff') NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `class_id` (`class_id`),

  CONSTRAINT `fk_users_class`
    FOREIGN KEY (`class_id`)
    REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 4. Teaching Assignments
CREATE TABLE `teaching_assignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `class_id` int NOT NULL,

  PRIMARY KEY (`id`),

  UNIQUE KEY `teacher_subject_class`
    (`teacher_id`, `subject_id`, `class_id`),

  KEY `subject_id` (`subject_id`),
  KEY `class_id` (`class_id`),

  CONSTRAINT `fk_assignment_teacher`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `users` (`id`),

  CONSTRAINT `fk_assignment_subject`
    FOREIGN KEY (`subject_id`)
    REFERENCES `subjects` (`id`),

  CONSTRAINT `fk_assignment_class`
    FOREIGN KEY (`class_id`)
    REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 5. Evaluations
CREATE TABLE `evaluations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `teaching_assignment_id` int NOT NULL,
  `grade` int NOT NULL,
  `opinion` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),

  UNIQUE KEY `student_assignment`
    (`student_id`, `teaching_assignment_id`),

  KEY `teaching_assignment_id` (`teaching_assignment_id`),

  CONSTRAINT `fk_evaluation_student`
    FOREIGN KEY (`student_id`)
    REFERENCES `users` (`id`),

  CONSTRAINT `fk_evaluation_assignment`
    FOREIGN KEY (`teaching_assignment_id`)
    REFERENCES `teaching_assignments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;