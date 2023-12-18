interface Props {
  children: React.ReactNode;
}

const ErrorBoundary = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ErrorBoundary;
