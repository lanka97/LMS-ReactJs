import axios from 'axios';
var headers = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
    }
};
export const fn_addSubmission = async payload =>{

    return await axios.post(' http://localhost:8080/lms/submission',payload,headers)
};
/**
 * payload JSON must have courseID,assignment,studentID
 * @param payload
 * @returns {Promise<AxiosResponse<T>>}
 */
export const fn_getSpecificSubmissionInfo = async payload =>{
    return await axios.get('http://localhost:8080/lms/submission/getassignment',{params:payload})
};

export const fn_deleteSubmission = async id =>{
    return await axios.delete("http://localhost:8080/lms/submission/"+id)
};

export const fn_getAllSubmissionByCourseAndAssignment = async (courseID,assignmentName)=>{
    return await axios.get(`http://localhost:8080/lms/submission/course/${courseID}/assignment/${assignmentName}`)
};

export const fn_updateAssignmentMarks = async (submissionID,data) =>{
    return await axios.put(`http://localhost:8080/lms/submission/${submissionID}`,data,headers);
};

export const fn_getAssignmentsByStudentID = async  (studentID) =>{
    return await axios.get(`http://localhost:8080/lms/submission/student/${studentID}`)
};
