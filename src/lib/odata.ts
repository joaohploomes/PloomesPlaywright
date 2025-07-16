import type { IOrderBy, IQueryOdata } from "@types";
class QueryOdata {
	private query: string;
	private $top = "";
	private $skip = "";
	private $orderBy = "";
	private $filter = "";
	private $select = "";

	constructor(prop: IQueryOdata) {
		this.query = "";
		this.orderBy(prop.orderBy);
		this.top(prop.top);
		this.skip(prop.skip);
		this.select(prop.select);
	}

	public select(fields: string[]) {
		if (fields === undefined || fields.length === 0) return;
		this.$select = `$select=${fields.join(",")}`;
	}

	public filter(condition: string) {
		this.query += `$filter=${condition}`;
		return this;
	}

	public orderBy(fields?: IOrderBy) {
		if (!fields || Object.keys(fields).length === 0) return;
		const orderByFields = Object.entries(fields);
		const queryOrderBy = orderByFields.map(([field, direction]) => {
			return `${field} ${direction}`;
		});
		this.$orderBy = `$orderby=${queryOrderBy.join(",")}`;
	}

	public top(count?: number) {
		if (count !== undefined && count > 0) this.$top = `$top=${count}`;
	}

	public skip(count?: number) {
		if (count !== undefined && count > 0) this.$skip = `$skip=${count}`;
	}

	public toString(): string {
		const filters = [this.$select, this.$orderBy, this.$top, this.$skip];
		return filters.filter(Boolean).join("&");
	}
}

export default QueryOdata;
