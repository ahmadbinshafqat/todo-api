import { DataSource } from 'typeorm';
import { Task } from './src/entities/task.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'yourpassword',
  database: process.env.DB_NAME || 'todo',
  entities: [Task],
  migrations: ['dist/migrations/*.js'], // Path to migrations
  synchronize: false, // Ensure this is false for production
});
