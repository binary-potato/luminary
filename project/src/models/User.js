import bcrypt from 'bcryptjs';
import db from '../config/database.js';

export class User {
  static async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = Date.now().toString();

    try {
      const stmt = db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
      stmt.bind([id, username, hashedPassword]);
      stmt.step();
      stmt.free();
      
      db.save();

      return {
        id,
        username
      };
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Username already exists');
      }
      throw error;
    }
  }

  static async authenticate(username, password) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    stmt.bind([username]);
    const row = stmt.step();
    stmt.free();
    
    if (!row) return null;
    
    const user = {
      id: row[0],
      username: row[1],
      password: row[2]
    };
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? { id: user.id, username: user.username } : null;
  }
}

export default User;