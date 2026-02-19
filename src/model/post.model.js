const pool = require("../config/database");

const Post = {
    findAll: async (limit, offset, filters = {}) => {
        let query = "select * from posts";
        const values = [];
        const filterEntries = Object.entries(filters).filter(
            ([_, value]) => value !== undefined && value !== null,
        );

        if (filterEntries.length > 0) {
            const conditions = filterEntries.map(([key, value]) => {
                values.push(value);
                return `${key} = ?`;
            });
            query += " where " + conditions.join(" and ");
        }

        query += " limit ? offset ?";
        values.push(limit, offset);

        const [rows] = await pool.query(query, values);
        return rows;
    },
    count: async (filters = {}) => {
        let query = "select count(*) as count from posts";
        const values = [];
        const filterEntries = Object.entries(filters).filter(
            ([_, value]) => value !== undefined && value !== null,
        );

        if (filterEntries.length > 0) {
            const conditions = filterEntries.map(([key, value]) => {
                values.push(value);
                return `${key} = ?`;
            });
            query += " where " + conditions.join(" and ");
        }

        const [rows] = await pool.query(query, values);
        return rows[0].count;
    },
    findOne: async (id) => {
        const [rows] = await pool.query("select * from posts where id = ?", [
            id,
        ]);
        return rows[0];
    },
};

module.exports = Post;
