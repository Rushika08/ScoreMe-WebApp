// AdPlaceholder.jsx
export default function AdPlaceholder({ position }) {
  return (
    <div className="bg-yellow-100 text-center text-sm p-4 my-4 rounded shadow">
      Ad Space - {position.toUpperCase()}
    </div>
  );
}
