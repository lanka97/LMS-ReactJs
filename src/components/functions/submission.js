import axios from 'axios';
var headers = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
    }
};
let SPRING_API = process.env.REACT_APP_SPRING_API;
let NODE_API = process.env.REACT_APP_NODE_API;
export const fn_addSubmission = async payload =>{

    return await axios.post(`${SPRING_API}/lms/submission`,payload,headers)
};
/**
 * payload JSON must have courseID,assignment,studentID
 * @param payload
 * @returns {Promise<AxiosResponse<T>>}
 */
export const fn_getSpecificSubmissionInfo = async payload =>{
    return await axios.get(`${SPRING_API}/lms/submission/getassignment`,{params:payload})
};

export const fn_deleteSubmission = async id =>{
    return await axios.delete(`${SPRING_API}/lms/submission/${id}`)
};

export const fn_getAllSubmissionByCourseAndAssignment = async (courseID,assignmentName)=>{
    return await axios.get(`${SPRING_API}/lms/submission/course/${courseID}/assignment/${assignmentName}`)
};

export const fn_updateAssignmentMarks = async (submissionID,data) =>{
    return await axios.put(`${SPRING_API}/lms/submission/${submissionID}`,data,headers);
};

export const fn_getAssignmentsByStudentID = async  (studentID) =>{
    return await axios.get(`${SPRING_API}/lms/submission/student/${studentID}`)
};

export const fn_getAssignmentInfoByID = async (id) =>{
    return await axios.get(`${NODE_API}/lms/Assigment/${id}`)
}
