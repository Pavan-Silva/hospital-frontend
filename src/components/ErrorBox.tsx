const ErrorBox = ({ message }: { message: string }) => {
  return (
    <span className="text-red-500 block my-5 p-3 rounded-lg bg-red-50">
      Error: {message}
    </span>
  );
};

export default ErrorBox;
