export const getUniqueRecord = (attendanceList) => {
  // console.log({ attendanceList });
  const uniqueRecord = [];
  const existingUser = new Set();
  attendanceList?.forEach((ele) => {
    if (!existingUser.has(ele.studentId)) {
      existingUser.add(ele.studentId);
      uniqueRecord.push(ele);
    }
  });
  return uniqueRecord;
  // console.log(uniqueRecord);
};
