async function pagination(modelInstance, page, limit) {
	const page = Number.parseInt(req.query.page);
	const limit = Number.parseInt(req.query.limit);

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const results = {};
	results.total = await model.countDocuments().exec();
	if (endIndex < results.total) {
		results.next = {
			page: page + 1,
			limit: limit,
		};
	}

	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit: limit,
		};
	}
	results.results = await modelInstance.limit(limit).skip(startIndex).exec();
	return results;
}
