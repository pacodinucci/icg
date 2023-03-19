export enum Status {
  CANDIDATE_REVIEW = "In Progress",
  CANDIDATE_INTERVIEW_BOOKED = " In Interview",
  CANDIDATE_PASSED = "Passed",
}

export type StatusEnumKeys = keyof typeof Status;

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
