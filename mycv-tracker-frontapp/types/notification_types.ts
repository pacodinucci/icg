export type Notification = {
    id: number,
        recruiter: string,
        recruiterEmail: string,
        agency: string,
        userId: number,
        userEmail: string,
        eventType: string,
        emailSent: boolean,
        lastTrackedTime: string,
        geoLocation: string,
        city?: null,
        country?: null,
        networkDomain: string,
        timeSpentOnCV?: null,
        trackingId: string,
        resumeId: number,
        matchMode: number,
        notificationsCount: number,
        trackingContext?: null,
        trackedResumeName: string
}

export type Notifications = Notification[]