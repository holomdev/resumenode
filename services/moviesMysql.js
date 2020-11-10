const mysqlLib = require('../lib/mysql');

class MovieServices {
  constructor() {
    this.table = 'movies';
  }

  async getMovies() {
    const [movies] = await mysqlLib.query('SELECT * FROM ??', [this.table]);
    return movies || [];
  }

  async getMovie({ movieId }) {
    const [movie] = await mysqlLib.query('SELECT * FROM ?? WHERE id=?', [
      this.table,
      movieId,
    ]);
    return movie || [];
  }

  async createMovie({ movie }) {
    const [results] = await mysqlLib.query('INSERT INTO ?? SET ? ', [
      this.table,
      movie,
    ]);
    return results.insertId;
  }

  async updateMovie({ movieId, movie }) {
    const [result] = await mysqlLib.query('UPDATE ?? SET ? WHERE id=?', [
      this.table,
      movie,
      movieId,
    ]);
    return result.info;
  }

  async deleteMovie({ movieId }) {
    const [result] = await mysqlLib.query('DELETE FROM ?? WHERE id=?', [
      this.table,
      movieId,
    ]);

    return result.affectedRows;
  }
}

module.exports = MovieServices;
