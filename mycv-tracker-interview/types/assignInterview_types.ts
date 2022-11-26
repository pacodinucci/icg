export type AssignInterviewRequest = {
  candidateName: string;
  invite: string;
  resultOwners: string;
  candidateEmail: string;
  interviewType: string;
  noOfQuestions: string;
  jobLink: string;
  candidateList: string;
};

export type CandidateResultRequest = {
  candidate: string;
  candidateEmail: string;
  candidateList: string;
  candidateName: string;
  interviewType: string;
  invite: string;
  jobLink: string;
  resultOwners: string;
  token: string;
};
