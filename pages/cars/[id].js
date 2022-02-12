import { useRouter } from 'next/router'

import Head from 'next/head'

const Car = ({ car }) => {

    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Head>
                <title>{car.id} - {car.color}</title>
            </Head>
            <h1>{car.id}</h1>
            <p>This is a {car.color} {car.id}</p>
            <p>Is it nice? {car.nice}</p>
        </>

    )
}

export default Car

export const getStaticProps = async ({ params }) => {
    const req = await fetch(`http://localhost:3000/data/${params.id}.json`);
    const data = await req.json()

    return {
        props: {
            car: data
        }
    }
}

export const getStaticPaths = async () => { 
    const req = await fetch(`http://localhost:3000/data/cars.json`);
    const data = await req.json()

    const paths = data.map(car => {
        return { params: { id: car } }
    })

    return {
        paths,
        fallback: false
    }
}