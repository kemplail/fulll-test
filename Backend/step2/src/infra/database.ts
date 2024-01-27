import { Database } from 'sqlite3'

const filepath = './src/infra/database.db'

export const database: Database = createDbConnection()

export function createDbConnection() {
    const db = new Database(filepath)
    db.exec('PRAGMA foreign_keys=ON')

    createTables(db)

    return db
}

function createTables(db: Database) {
    db.exec(
        `
  CREATE TABLE IF NOT EXISTS fleets
  (
    ID INTEGER PRIMARY KEY,
    owner_id   INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS vehicles
  (
    ID INTEGER PRIMARY KEY,
    plate_number string NOT NULL UNIQUE,
    location_latitude DECIMAL(10, 6),
    location_longitude DECIMAL (10, 6)
  );
  CREATE TABLE IF NOT EXISTS j_vehicule_fleet
  (
    plate_number string,
    fleet_id INT,
    FOREIGN KEY (plate_number) REFERENCES vehicles(plate_number) ON DELETE CASCADE,
    FOREIGN KEY (fleet_id) REFERENCES fleets(ID) ON DELETE CASCADE
  );
`,
        (err) => {
            if (err) {
                console.log('An error appeared when creating the tables')
            }
        }
    )
}
