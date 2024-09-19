export type cardData = {
    id: string;
    title: string;
    description: string;
    count:number;
}

export const playlistTitles: cardData[] = [
    {
        id: '01',
        title: 'Career Development/Career Brand',
        description:'Unlock your potential with curated content on career growth and personal branding. ',
        count:6
    },
    {
        id: '02',
        title: 'How to be well articulated and well spoken',
        description:'Learn how to be more articulate and well spoken. ',
        count:21
    },
    {
    id: '03',
    title: 'Communication in the Workplace',
    description:'In this module, you’ll learn how to communicate in the workplace.',
    count:15
    },
    {
        id: '04',
        title: 'Interview Prep',
        description:'Want the inside scoop on how to prepare for your next interview?',
        count:25
    },
    {
    id: '05',
    title: 'Workplace Etiquette',
    description:'Navigate your professional environment with confidence.',
    count:10
    },
]