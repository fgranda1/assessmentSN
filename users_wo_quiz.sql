SELECT 
UserId,
CourseId,
RoleName,
QuizId,
(case 
	when QuizId is NULL then 'NO'
    else 'YES'
end) as quiz_atempted
FROM 
(SELECT 
	enrollments.UserId, 
	enrollments.CourseId, 
    enrollments.RoleName, 
    quiz_attempts.QuizId
FROM enrollments
LEFT JOIN quiz_attempts 
	ON enrollments.UserId = quiz_attempts.UserId 
UNION
SELECT 
	enrollments.UserId, 
	enrollments.CourseId, 
    enrollments.RoleName, 
    quiz_attempts.QuizId
FROM quiz_attempts
RIGHT JOIN enrollments 
	ON enrollments.UserId = quiz_attempts.UserId 
    ) as U 
WHERE U.CourseId = 150
AND U.QuizId IS NULL