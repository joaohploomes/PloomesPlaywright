class QueryOdata {
  private query: string;

  constructor() {
    this.query = '';
  };

  public select(fields: string[]): QueryOdata {
    this.query += `$select=${fields.join(',')}`;
    return this;
  };

  public filter(condition: string): QueryOdata {
    this.query += `$filter=${condition}`;
    return this;
  };

  public orderBy(fields: string[]): QueryOdata {
    this.query += `$orderby=${fields.join(',')}`;
    return this;
  };

  public top(count: number): QueryOdata {
    this.query += `$top=${count}`;
    return this;
  };

};

export default QueryOdata;
