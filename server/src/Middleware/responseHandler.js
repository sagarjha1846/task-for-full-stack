const sendResponse = (res, data, status) => {
  res.status(status).json({ success: true, data });
};

export default sendResponse;
