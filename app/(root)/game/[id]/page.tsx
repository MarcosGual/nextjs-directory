// /game/3 dynamic routing

import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    

    return (
        <div>
            <h1 className='text-3xl'>Número de juego: {id}</h1>
        </div>
    )
}

export default Page