import { auth } from '@/auth'
import GameForm from '@/components/GameForm'
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <h1 className="heading">Cargá tu Juego favorito!</h1>
      </section>
      <GameForm />
    </>
  )
}

export default Page