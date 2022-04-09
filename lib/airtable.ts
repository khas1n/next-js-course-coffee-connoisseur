import Airtable, { FieldSet } from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY as string);

const table = base("coffee-stores");

const getMinifiedRecord = (record: Airtable.Record<FieldSet>) => ({ ...record.fields });

const getMinifiedRecords = (records: Airtable.Records<FieldSet>) => records.map((record) => getMinifiedRecord(record));

export { table, getMinifiedRecords };
