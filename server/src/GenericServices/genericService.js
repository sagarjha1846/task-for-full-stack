const create = async (data, model) => {
  const resp = await model.create(data);
  return resp;
};

const fetch = async (where, model) => {
  const resp = await model.findOne(where).lean();
  return resp;
};

const fetchAll = async (where, model) => {
  const resp = await model.findAll(where);
  return resp;
};

const update = async (where, updated, model) => {
  const resp = await model.findByIdAndUpdate(where, updated, { new: true });
  return resp;
};

const deleteOrDisable = async (where, model) => {
  const resp = await model.findByIdAndDelete(where);
  return resp;
};

const genericServices = {
  fetchAll,
  fetch,
  deleteOrDisable,
  update,
  create,
};

export default genericServices;
