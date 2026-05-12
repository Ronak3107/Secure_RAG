let documentContent = "";

const setDocumentContent = (
  content
) => {

  documentContent = content;
};

const getDocumentContent = () => {

  return documentContent;
};

module.exports = {
  setDocumentContent,
  getDocumentContent,
};