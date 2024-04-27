export default class Student {
  constructor(
    public school: string,
    public name: string,
    public clientId: string,
    public therapist: string,
    public dateOfBirth: string,
    public gradeLevel: string,
    public gender: string,
    public ethnicity: string
  ) {}
}

export const createStudent = (dataArray: string[]) => {
  if (dataArray.length < 8) {
    throw new RangeError(
      "Student data is missing values. Please make sure the uploaded file is well-formed and contains the proper columns."
    )
  }

  return new Student(
    dataArray[0].trim(),
    dataArray[1].trim(),
    dataArray[2].trim(),
    dataArray[3].trim(),
    dataArray[4].trim(),
    dataArray[5].trim(),
    dataArray[6].trim(),
    dataArray[7].trim()
  )
}
