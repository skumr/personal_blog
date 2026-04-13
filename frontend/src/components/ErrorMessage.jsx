export function ErrorMessage({ message }) {
  return (
    <p role="alert" style={{ color: 'crimson' }}>
      {message}
    </p>
  );
}