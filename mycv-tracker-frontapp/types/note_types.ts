export type Note = {
  agency: string;
  attachmentFile?: null;
  attachmentName?: null;
  campaign?: null;
  content: string;
  createdDate: string;
  id: number;
  noteStatus: number;
  notes?: null;
  notesType: string;
  originalJobPosterEmailAddress?: null;
  recruiter: string;
  referContent?: null;
  resumeId: number;
  subject: string;
  targetList?: null;
  toRecruiter: string;
  tracked: boolean;
  trackingId: string;
  userId: number;
};

export type NotesResponse = {
  content: Note[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
};
