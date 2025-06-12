interface IOrderBy {
    [key: string]: "asc" | "desc";
};

interface IFilter {
    [key: string]: {
        operator: string;
        value: string;
    }
};


interface IQueryOdata {
    filter?: {
        AND?: IFilter[];
        OR?: IFilter[];
    };
    select?: string[];
    expand?: string;
    orderBy?: IOrderBy;
    top?: number;
    skip?: number;
    count?: boolean;
};

export type { IQueryOdata, IOrderBy, IFilter };
