import PropTypes from "prop-types";

const NewProductMessage = ({ message }) => {
  return (
    <>
      {message && (
        <div className="message-error-container">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

NewProductMessage.propTypes = {
  message: PropTypes.string,
};

export default NewProductMessage;
