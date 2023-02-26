import Link from "next/link"

export default function Card({ name, created, id }) {
  return (
    <>
      <Link href={`/channels/${id}`}>
      <div
        className="p-8 mt-4 bg-gray-800 max-w-xs cursor-pointer hover:bg-gray-600"
      >
        <h2>{name}</h2>
        <p>{created}</p>
      </div>
      </Link>
    </>
  )
}