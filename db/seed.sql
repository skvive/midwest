-- src/lib/data.ts (In-Memory SSOT) 와 1:1 동기화. 전 행 is_dummy = TRUE.
INSERT INTO posts (id, board, title, body, date, image, is_dummy, deleted_at) VALUES
(1, 'gallery', 'DBA Program Hosts DBA 802 Intensive Course',
 'The newly launched Doctor of Business Administration program hosted the DBA 802 (Data Analytics and Strategic Decision Intelligence) intensive course at the St. Louis campus. Students engaged in data visualization, predictive analytics, and AI-enabled decision support workshops.',
 '2026-08-10', '/media/innoboard/files/inno_64/Business Administration.jpg', TRUE, NULL),
(2, 'gallery', 'New Doctoral Program Open',
 'Midwest University announces the opening of new doctoral programs including the Doctor of Business Administration (DBA) and Ph.D. in Financial Economics. Applications are now being accepted for the upcoming semester.',
 '2026-07-28', '/media/innoboard/files/inno_64/1(28).jpg', TRUE, NULL),
(3, 'miri', 'F-1 Visa Uncertainty Grows — Guidance for International Students',
 'MIRI shares the latest guidance for international students regarding F-1 visa policy updates. Students are encouraged to consult the International Student Office for SEVIS advising and to keep their documentation current.',
 '2026-08-05', NULL, TRUE, NULL),
(4, 'bulletin', '2026 Fall Semester Registration Notice',
 'Registration for the 2026 Fall semester is now open. Please log in to Populi to register for courses. Contact the Registrar''s Office for assistance with enrollment, add/drop, and academic advising.',
 '2026-08-01', NULL, TRUE, NULL),
(5, 'bulletin', 'Commencement 2026 & 40th Anniversary Celebration',
 'Midwest University celebrates its 40th anniversary together with Commencement 2026. All students, alumni, faculty, and friends are invited to join the ceremony at the Wentzville campus.',
 '2026-06-15', '/media/images/2026 Midwest Graduation.jpg', TRUE, NULL),
(6, 'bulletin', '2026 Music Concert — School of Music',
 'The School of Music presents the 2026 annual concert featuring student and faculty performances. Admission is free and open to the community.',
 '2026-05-20', '/media/images/2026 music concert.jpg', TRUE, NULL),
(7, 'bulletin', 'Academic Calendar Update — Summer Session',
 'The updated academic calendar for the summer session has been posted. Please review key dates for registration, holidays, and final examinations.',
 '2026-04-30', NULL, TRUE, NULL),
(8, 'miri', 'MIRI J-1 Research Internship — Now Accepting Applications',
 'The Midwest Institute of Research and Innovation (MIRI) is accepting applications for the J-1 Student Intern and J-1 Professor/Research Scholar programs. See the J-1 Forms page for required documents.',
 '2026-07-15', NULL, TRUE, NULL)
ON CONFLICT (id) DO NOTHING;

SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));
