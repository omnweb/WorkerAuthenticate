import User from "../models/user.model";
import db from "../db";
import DatabaseError from "../models/errors/database.error.model";

class UserRepository {
  async findUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const query = `
          SELECT uuid, username
          FROM app_user
          WHERE username = $1
          AND password = crypt($2, 'my_salt')
      `;
      const values = [username, password];
      console.log(query)
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user || null;
    } catch (error) {
      throw new DatabaseError("Error fetching user and password", error);
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      const query = `
            SELECT uuid, username, email, created_at, updated_at
            FROM app_user
        `;

      const { rows } = await db.query<User>(query);
      return rows || [];
    } catch (error) {
      throw new DatabaseError("Error fetching users", error);
    }
  }

  async findUserByUuid(uuid: string): Promise<User> {
    try {
      const query = `
            SELECT uuid, username, email, created_at, updated_at
            FROM app_user
            WHERE uuid = $1
        `;
      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user || [];
    } catch (error) {
      throw new DatabaseError("Error fetching user", error);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const query = `
            INSERT INTO app_user (username, email, password)
            VALUES ($1, $2, crypt($3, 'my_salt'))
            RETURNING uuid, username, email, created_at, updated_at
        `;

      const values = [user.username, user.email, user.password];
      const { rows } = await db.query<User>(query, values);
      const [newUser] = rows;

      return newUser || [];
    } catch (error) {
      throw new DatabaseError("Error creating user", error);
    }
  }

  async updateUser(user: User): Promise<void> {
    try {
      const query = `
            UPDATE app_user 
            SET 
              username = $1, 
              email = $2, 
              password = crypt($3, 'my_salt')
              updated_at = now()
            WHERE uuid = $4
        `;

      const values = [user.username, user.email, user.password, user.uuid];
      await db.query(query, values);
    } catch (error) {
      throw new DatabaseError("Error updating user", error);
    }
  }

  async deleteUser(uuid: String): Promise<void> {
    try {
      const query = `
        DELETE 
        FROM app_user 
        WHERE uuid = $1`;
      const values = [uuid];
      await db.query(query, values);
    } catch (error) {
      throw new DatabaseError("Error deleting user", error);
    }
  }
}

export default new UserRepository();
