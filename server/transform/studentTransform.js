class StudentApiTransform {
  static transform(student) {
    return {
      id: student.id,
      rollNo: student.roll_no,
      name: `${student.f_name} ${student.l_name}`,
      email: student.email,
      course: student.course,
      semester: student.semester,
      department: student.department,
      year: student.year,
    };
  }
}

export default StudentApiTransform;
