import { Pool } from "pg";
import  db from '../database/db' 
import { describe, it, expect, expectTypeOf, vi, beforeAll, afterAll } from "vitest"

// Mock the entire pg module
vi.mock('pg', () => {
  const mockPool = {
    query: vi.fn().mockResolvedValue({ rows: [] }),
    end: vi.fn(),
    on: vi.fn() // For error event handling
  };
  return { Pool: vi.fn(() => mockPool) };
});

describe('Database Configuration', () => {
  it('should create a pool with correct configuration', () => {
    // db is the Pool instance
    expect(Pool).toHaveBeenCalledWith({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: { rejectUnauthorized: false }
    });
  });

  it('should execute queries', async () => {
    const result = await db.query('SELECT NOW()');
    expect(result).toEqual({ rows: [] });
    expect(db.query).toHaveBeenCalledWith('SELECT NOW()');
  });

  it('should handle connection errors', async () => {
    // Simulate connection error
    db.query.mockRejectedValueOnce(new Error('Connection failed'));
    await expect(db.query('SELECT NOW()')).rejects.toThrow('Connection failed');
  });

  it('should allow ending the pool', async () => {
    await db.end();
    expect(db.end).toHaveBeenCalled();
  });

  afterAll(async () => {
    await db.end();
  });
});