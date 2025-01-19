'use server'

export default async function UserCarPage({
  params
}: {
  params: { carId: number }
}) {
  const { carId } = params

  return <p>Post: {carId}</p>
}
