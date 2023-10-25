export interface Timezone {
	abbreviation: string;
	datetime: string;
	type: number;
	day_of_week: number;
	dst: boolean;
	dst_from: string;
	dst_offset: number;
	dst_until: string;
	raw_offset: number;
	timezone: string;
	unixtime: number;
	utc_datetime: string;
	utc_offset: string;
	week_number: number;
}
