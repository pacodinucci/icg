export type Question = {
    id: number,
    question: string,
    questionType: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    correct: string
}

export type Questions = Question[]