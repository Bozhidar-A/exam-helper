export interface APIData {
    id:         number;
    qNum:       number;
    type:       string;
    year:       number;
    session:    number;
    question?:  string;
    wrong?:     string[] | string;
    correct?:   string[] | string;
    answers?:   APIDataAnswer[];
    options?:   Option[];
    maxPoints?: number;
    textsArr?:string[]
}

export interface APIDataAnswer {
    label:     string;
    wrong?:    string[];
    correct:   string[] | string;
    question?: string;
}

export interface Option {
    label:   string;
    answers: OptionAnswer[];
    wrong:   string[];
}

export interface OptionAnswer {
    label:   string;
    correct: string;
}

export default interface IAPI{
    status:string,
    error:any,
    data:APIData[]
}