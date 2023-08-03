const { Client } = require('pg');
const InvestorConverter = require('./converter')
const DB_HOST = "bbr-db.caocnqnzfjrh.us-east-1.rds.amazonaws.com";
const DB_PORT = "5432";
const DB_USER = "bbr_pgadmin";
const DB_NAME = "postgres";
const DB_PWD = "Kz[kRl;-W7:!Xq+*2e4X<7F:RrkD?F";

class PostgreSQLHandler {
  constructor() {
    this.client = new Client({
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PWD,
      port: DB_PORT,
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    }
  }

  async disconnect() {
    try {
      await this.client.end();
      console.log('Disconnected from the database');
    } catch (error) {
      console.error('Error disconnecting from the database:', error.message);
    }
  }

  async selectFromTableByIds(table_name, ids) {
    try {
      const query = `SELECT * FROM ${table_name} WHERE investor_id IN (${ids.join(',')});`;
      const { rows } = await this.client.query(query);

      const rows_dict_list = rows.map(row => {
        const row_dict = {};
        for (const [key, value] of Object.entries(row)) {
          row_dict[key] = value instanceof Date ? value.toISOString() : value;
        }
        return row_dict;
      });

      const json_data = JSON.stringify(rows_dict_list, null, 4);
      return json_data;
    } catch (error) {
      console.error('Error selecting from the table:', error.message);
      return null;
    }
  }
}

async function main() {
  const postgresHandler = new PostgreSQLHandler();

  try {
    await postgresHandler.connect();

    const ids_to_filter = [4, 349, 404, 393, 434, 276, 478, 485, 506];
    const table_name = 'investor'; // Replace with your actual table name

    const jsonData = await postgresHandler.selectFromTableByIds(table_name, ids_to_filter);
    if (jsonData) {
      const converter = new InvestorConverter()
      const parsed = JSON.parse(jsonData).map(data => {
        converter.investor_json = data;
        console.log(data)
        return converter.convertToUserAccountsTable()
      })
      console.log(parsed[0])
    }

    await postgresHandler.disconnect();
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();

