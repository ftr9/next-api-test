const filterAllowedFields = (reqBody, allowedFields) => {
  const formBody = { ...reqBody };
  Object.keys(formBody).forEach(el => {
    if (!allowedFields.includes(el)) {
      delete formBody[el];
    }
  });

  return formBody;
};

export default filterAllowedFields;
