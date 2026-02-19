const PaginationService = {
    apply: (service) => {
        if (!service.model) {
            throw Error("Model is required for pagination!");
        }

        service.pagination = async (page = 1, limit = 20, filters) => {
            if (limit > 500) {
                limit = 500;
            }
            const offset = (page - 1) * limit;

            const rows = await service.model.findAll(limit, offset, filters);
            const count = await service.model.count(filters);

            const pagination = {
                total: count,
                per_page: limit,
                current_page: page,
            };

            if (rows.length) {
                pagination.from = offset + 1;
                pagination.to = offset + rows.length;
            }

            return { rows, pagination };
        };
    },
};

module.exports = PaginationService;
