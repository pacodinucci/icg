export enum Status {
  CANDIDATE_REVIEW = "CANDIDATE_REVIEW",
  CANDIDATE_INTERVIEW_BOOKED = "CANDIDATE_INTERVIEW_BOOKED",
  CANDIDATE_PASSED = "CANDIDATE_PASSED",
}

type StatusEnumKeys = keyof typeof Status;

export type PartySharing = {
  id: number,
      userId: number,
      resumeId: number,
      partyName: string,
      partyEmail: string,
      sharingContent: string,
      status: `${StatusEnumKeys}`,
      expiry: number
}
